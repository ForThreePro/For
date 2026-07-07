/**
 * 📂 PLUGIN: NEXUS API PACK
 * 📝 DESCRIPCIÓN: TikTok, IG, AI, RemoveBG, Pinterest con api.evogb.org
 * 👤 CREADOR: Whois Yallico
 * ⚡ CANAL: For Three
 * 🔌 API KEY: c2FzdWtl
 */
import fetch from "node-fetch"
import FormData from "form-data"

const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
const creator = 'Whois Yallico'
const channel = 'For Three'

// FUNCIÓN PARA FETCH CON REINTENTO
async function apiFetch(url) {
    let res = await fetch(url)
    let json = await res.json()
    if (!json.status) {
        await new Promise(r => setTimeout(r, 1500))
        res = await fetch(url)
        json = await res.json()
    }
    return json
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    await m.react('⏳')
    
    try {
        // ===== 1. TIKTOK =====
        if (command.match(/^(tiktok|tt)$/i)) {
            if (!text) return m.reply(`*📱 Nexus TikTok*\n\n*Uso:* ${usedPrefix}tt [link]`)
            if (!text.includes('tiktok.com')) return m.reply('*❌ Link inválido*')
            
            let json = await apiFetch(`https://api.evogb.org/dl/tiktok?url=${encodeURIComponent(text)}&key=${key}`)
            let { title, author, dl } = json.data
            
            await conn.sendMessage(m.chat, {
                video: { url: dl },
                caption: `*📱 NEXUS TIKTOK*\n\n📌 *Título:* ${title}\n👤 *Autor:* ${author}\n\n👤 *Creador:* ${creator}\n⚡ *${channel}*`
            }, { quoted: m })
        }

        // ===== 2. INSTAGRAM =====
        else if (command.match(/^(ig|instagram)$/i)) {
            if (!text) return m.reply(`*📸 Nexus Instagram*\n\n*Uso:* ${usedPrefix}ig [link]`)
            if (!text.includes('instagram.com')) return m.reply('*❌ Link inválido*')
            
            let json = await apiFetch(`https://api.evogb.org/dl/ig?url=${encodeURIComponent(text)}&key=${key}`)
            let { title, author, dl } = json.data
            
            await conn.sendMessage(m.chat, {
                video: { url: dl },
                caption: `*📸 NEXUS INSTAGRAM*\n\n📌 *Descripción:* ${title}\n👤 *Autor:* ${author}\n\n👤 *Creador:* ${creator}\n⚡ *${channel}*`
            }, { quoted: m })
        }

        // ===== 3. CHATGPT / AI =====
        else if (command.match(/^(ai|gpt|chat)$/i)) {
            if (!text) return m.reply(`*🧠 Nexus AI*\n\n*Ejemplo:* ${usedPrefix}ai explicame que es javascript`)
            
            let json = await apiFetch(`https://api.evogb.org/ai/chatgpt?q=${encodeURIComponent(text)}&key=${key}`)
            m.reply(`*🧠 NEXUS AI*\n\n${json.data.result}\n\n👤 *Creador:* ${creator}`)
        }

        // ===== 4. REMOVE BACKGROUND =====
        else if (command.match(/^(removebg|nobg)$/i)) {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return m.reply('*🖼️ Responde a una imagen para quitarle el fondo*')
            
            let img = await q.download()
            let form = new FormData()
            form.append('file', img, 'img.jpg')
            
            let upload = await fetch(`https://api.evogb.org/tools/upload?key=${key}`, { method: 'POST', body: form })
            let upJson = await upload.json()
            
            let res = await fetch(`https://api.evogb.org/tools/removebg?url=${encodeURIComponent(upJson.url)}&key=${key}`)
            let buffer = await res.buffer()
            
            await conn.sendMessage(m.chat, { 
                image: buffer, 
                caption: `*🖼️ FONDO ELIMINADO*\n\n👤 *Creador:* ${creator}\n⚡ *${channel}*` 
            }, { quoted: m })
        }

        // ===== 5. PINTEREST =====
        else if (command.match(/^(pinterest|pin)$/i)) {
            if (!text) return m.reply(`*📌 Nexus Pinterest*\n\n*Ejemplo:* ${usedPrefix}pin anime girl`)
            
            let json = await apiFetch(`https://api.evogb.org/search/pinterest?q=${encodeURIComponent(text)}&key=${key}`)
            let result = json.data.slice(0, 5)
            
            let caption = `*📌 RESULTADOS: ${text}*\n\n`
            for (let i = 0; i < result.length; i++) caption += `${i+1}. ${result[i]}\n`
            caption += `\n👤 *Creador:* ${creator}\n⚡ *${channel}*`
            
            m.reply(caption)
        }

        await m.react('✅')
        
    } catch (e) {
        await m.react('❌')
        m.reply(`❌ Error: ${e}`)
    }
}

handler.help = ['tt', 'ig', 'ai', 'removebg', 'pin']
handler.tags = ['Descargas']
handler.command = /^(tiktok|tt|ig|instagram|ai|gpt|chat|removebg|nobg|pinterest|pin)$/i
handler.limit = true

export default handler