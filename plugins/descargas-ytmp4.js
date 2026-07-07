/**
 * 📂 COMANDO: Uchiha YouTube MP4 Downloader
 * 📝 DESCRIPCIÓN: Descarga video de YouTube en MP4
 * 👤 CREADOR: Whois Yallico
 * ⚡ CANAL: For Three
 * 🔌 API: https://api.evogb.org
 */
import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    if (!text) return conn.reply(m.chat, `*☁️ For Three - YT MP4*\n\n*Uso:* ${usedPrefix + command} [link] [360|720|1080]\n*Ejemplo:* ${usedPrefix + command} https://youtu.be/xxx 720`, m)

    // Validar link de YT
    if (!text.match(/(youtu\.be\/|youtube\.com\/watch\?v=)/)) {
        return m.reply(`*❌ Link inválido*\nManda un link de YouTube válido`)
    }

    let args = text.trim().split(' ')
    let url = args[0]
    let quality = args[1] || '720' // 360, 720, 1080

    await m.react('⏳')
    let timeout = setTimeout(() => m.react('🕐'), 15000)

    try {
        let apiUrl = `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(url)}&quality=${quality}&key=${key}`
        let resDl = await fetch(apiUrl)
        let jsonDl = await resDl.json()

        // Reintento si falla
        if (!jsonDl.status) {
            await new Promise(r => setTimeout(r, 2000))
            resDl = await fetch(apiUrl)
            jsonDl = await resDl.json()
            if (!jsonDl.status) throw jsonDl.message || 'Error al procesar'
        }

        let { title, thumbnail, author, dl, quality: ql, duration, size } = jsonDl.data
        if (!dl) throw 'No se encontró el link de descarga'

        clearTimeout(timeout)

        // WhatsApp límite ~100MB para video
        let sizeNum = parseFloat(size)
        if (sizeNum > 100) {
            return m.reply(`*⚠️ Video muy pesado:* ${size}\n\n*Link directo:* ${dl}\n\n👤 *Creador:* Whois Yallico | ⚡ *For Three*`)
        }

        let info = `*☁️ For Three - Video Descargado*\n\n📌 *Título:* ${title}\n👤 *Canal:* ${author?.name || 'Desconocido'}\n⏱️ *Duración:* ${duration? new Date(duration * 1000).toISOString().substr(11, 8) : 'N/A'}\n📺 *Calidad:* ${ql || quality + 'p'}\n⚖ *Peso:* ${size || 'N/A'}\n\n👤 *Creador:* Whois Yallico\n⚡ *Canal:* For Three`

        await conn.sendMessage(m.chat, {
            video: { url: dl },
            caption: info,
            fileName: `${title}.mp4`,
            mimetype: 'video/mp4'
        }, { quoted: m })

        await m.react('✅')

    } catch (e) {
        clearTimeout(timeout)
        console.error(e)
        await m.react('❌')
        m.reply(`❌ Error: ${e}`)
    }
}

handler.help = ['ytmp4']
handler.tags = ['descargas']
handler.command = /^(ytmp4|ytv|play)$/i
handler.limit = true

export default handler