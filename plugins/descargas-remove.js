/**
 * 📂 COMANDO: Nexus Remove Background
 * 📝 DESCRIPCIÓN: Quita el fondo de cualquier imagen
 * 👤 CREADOR: Whois Yallico
 * ⚡ CANAL: For Three
 * 🔌 API: https://api.evogb.org
 */
import fetch from "node-fetch"

let handler = async (m, { conn }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime || !mime.startsWith('image')) {
        return m.reply(`*🖼️ NEXUS REMOVE BG*\n\nResponde a una imagen con el comando\n*Ejemplo:* responde a la foto y pon .removebg`)
    }

    await m.react('⏳')
    
    try {
        // Descargar imagen
        let img = await q.download()
        let form = new FormData()
        form.append('image', img, 'image.jpg')
        form.append('key', key)

        let res = await fetch('https://api.evogb.org/tools/removebg', {
            method: 'POST',
            body: form
        })
        
        let txt = await res.text()
        if (txt.startsWith('<')) throw 'La API está caída'
        let json = JSON.parse(txt)
        
        if (!json.status || !json.data?.result) throw json.message || 'Error al procesar'

        // Enviar imagen sin fondo
        await conn.sendFile(m.chat, json.data.result, 'nobg.png', `*🖼️ NEXUS REMOVE BG*\n\n✅ Fondo eliminado\n👤 *Creador:* Whois Yallico\n⚡ *Canal:* For Three`, m)
        await m.react('✅')
        
    } catch (e) {
        await m.react('❌')
        m.reply(`❌ Error: ${e}`)
    }
}

handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(removebg|nobg|bg)$/i
handler.limit = true

export default handler