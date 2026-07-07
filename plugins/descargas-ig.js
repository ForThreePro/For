import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
    if (!text) return m.reply(`*📸 NEXUS INSTAGRAM*\n\n*Uso:* ${usedPrefix}ig [link]`)
    
    await m.react('⏳')
    try {
        // USAMOS /download/ EN VEZ DE /dl/
        let res = await fetch(`https://api.evogb.org/download/ig?url=${encodeURIComponent(text)}&key=${key}`)
        let txt = await res.text()
        if (txt.startsWith('<')) throw 'Endpoint de IG bloqueado'
        let json = JSON.parse(txt)
        
        await conn.sendMessage(m.chat, {
            video: { url: json.data.dl },
            caption: `*📸 NEXUS INSTAGRAM*\n\n👤 *Autor:* ${json.data.author}\n\n👤 *Creador:* Whois Yallico\n⚡ *For Three*`
        }, { quoted: m })
        await m.react('✅')
    } catch (e) {
        await m.react('❌')
        m.reply(`❌ ${e}\n\nSi sigue fallando es porque IG bloqueó la API hoy`)
    }
}
handler.command = /^(ig)$/i
export default handler