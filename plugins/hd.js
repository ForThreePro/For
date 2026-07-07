/**
 * 📂 COMANDO: Uchiha AI Image Upscaler
 * 📝 DESCRIPCIÓN: Mejora la calidad de una imagen (Upscale) + Marca de agua
 * 👤 CREADOR: Whois Yallico
 * ⚡ CANAL: For Three
 * 🔌 API: https://api.evogb.org
 */
import fetch from "node-fetch"
import FormData from "form-data"
import crypto from "crypto"
import Jimp from "jimp" // <-- NUEVO

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
    const start = Date.now()
    let q = m.quoted? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let args = text? text.trim().split(' ') : []
    let urlTarget = args[0] || ''
    let scale = args[1] || 'x4' // x2 o x4

    if (!urlTarget &&!/image\/(jpe?g|png)/.test(mime)) {
        return conn.reply(m.chat, `*☁️ For Three - AI HD*\n\n*Uso:* ${usedPrefix + command} [link] [x2|x4]\n*Ejemplo:* ${usedPrefix + command} x4\n> Responde a una imagen o manda el link`, m)
    }

    // Cooldown 5 usos
    global.db.data.users[m.sender].upscale = global.db.data.users[m.sender].upscale || 0
    if (global.db.data.users[m.sender].upscale >= 5) {
        return m.reply(`*⏰ Límite alcanzado*\nEspera 1 hora para usarlo de nuevo.`)
    }

    await m.react('⏳')
    let timeout = setTimeout(() => m.react('🕐'), 15000)

    try {
        let finalUrl = urlTarget

        if (!finalUrl && /image\/(jpe?g|png)/.test(mime)) {
            let imgBuffer = await q.download()
            if (imgBuffer.length > 10 * 1024 * 1024) throw 'La imagen no puede pesar más de 10MB'

            let ext = mime.split('/')[1] || 'jpg'
            let filename = 'media-' + crypto.randomBytes(8).toString('hex') + '.' + ext
            let formulario = new FormData()
            formulario.append('file', imgBuffer, { filename, contentType: mime })

            let resUpload = await fetch(`https://api.evogb.org/tools/upload?key=${key}`, {
                method: 'POST', body: formulario, headers: {...formulario.getHeaders(), 'User-Agent': 'Mozilla/5.0'}
            })
            let jsonUpload = await resUpload.json()
            if (!jsonUpload.status) throw jsonUpload?.message || 'Error al subir'
            finalUrl = jsonUpload.url
        }

        let apiUrl = `https://api.evogb.org/tools/upscale?method=url&url=${encodeURIComponent(finalUrl)}&scale=${scale}&key=${key}`
        let resDl = await fetch(apiUrl)

        if (resDl.status === 429) {
            await m.reply('*Servidores saturados. Reintentando...*')
            await new Promise(r => setTimeout(r, 3000))
            resDl = await fetch(apiUrl)
        }

        let contentType = resDl.headers.get("content-type")
        if (contentType?.includes("application/json")) {
            let jsonDl = await resDl.json()
            throw jsonDl.message || 'No se pudo mejorar la imagen.'
        }

        let buffer = await resDl.buffer()

        // ===== MARCA DE AGUA "For Three" =====
        let image = await Jimp.read(buffer)
        let font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE) // fuente blanca
        let textData = {
            text: 'For Three',
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
        }
        // Fondo semi-transparente
        image.print(font, 0, image.bitmap.height - 60, textData, image.bitmap.width, 50)
        image.opacity(0.85) // un poco transparente
        let finalBuffer = await image.getBufferAsync(Jimp.MIME_JPEG)
        // ======================================

        clearTimeout(timeout)

        let info = `*☁️ For Three - Imagen Mejorada*\n\n✨ *Escala:* ${scale}\n📏 *Peso:* ${(finalBuffer.length/1024/1024).toFixed(2)} MB\n⏱️ *Tiempo:* ${((Date.now()-start)/1000).toFixed(2)}s\n👤 *Creador:* Whois Yallico\n⚡ *Canal:* For Three`

        await conn.sendMessage(m.chat, { image: finalBuffer, caption: info }, { quoted: m })
        global.db.data.users[m.sender].upscale++
        await m.react('✅')

    } catch (e) {
        clearTimeout(timeout)
        console.error(e)
        await m.react('❌')
        m.reply(`❌ Error: ${e}`)
    }
}

handler.help = ['upscale', 'remini']
handler.tags = ['tools']
handler.command = /^(upscale|remini|hd|mejorar)$/i
handler.limit = true

export default handler