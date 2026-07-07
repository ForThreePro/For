/**
 * 📂 COMANDO: Nexus Remove Background V2
 * 👤 CREADOR: Whois Yallico
 * ⚡ CANAL: For Three
 */
import fetch from "node-fetch"
import FormData from "form-data" // IMPORTANTE

let handler = async (m, { conn }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime || !mime.startsWith('image')) {
        return m.reply(`*🖼️ NEXUS REMOVE BG*\n\nResponde a una imagen con el comando\n*Ejemplo:* .removebg`)
    }

    await m.react('⏳')
    
    try {
        let img = await q.download() // Esto es un Buffer
        let form = new FormData()
        form.append('image', img, { filename: 'image.jpg' }) // Así sí lo acepta
        form.append('key', key)

        let res = await fetch('https://api.evogb.org/tools/removebg', {
            method: 'POST',
            body: form,
            headers: form.getHeaders() // IMPORTANTE para form-data
        })
        
        let txt = await res.text()
        if (txt.startsWith('<')) throw 'La API está caída'
        let json = JSON.parse(txt)
        
        if (!json.status || !json.data?.result) throw json.message || 'Error al procesar'

        await conn.sendFile(m.chat, json.data.result, 'nobg.png', `*🖼️ NEXUS REMOVE BG*\n\n✅ Fondo eliminado\n👤 *Creador:* Whois Yallico\n⚡ *Canal:* For Three`, m)
        await m.react('✅')
        
    } catch (e) {
        await m.react('❌')
        m.reply(`❌ Error: ${e}`)
    }
}

handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(removebg|nobg)$/i
handler.limit = true

export default handler