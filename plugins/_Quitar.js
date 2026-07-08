/*
  📂 COMANDO: Remove BG Xteam
  👤 CREADOR: Whois Yallico
  ⚡ CANAL: For Three
*/

import fetch from 'node-fetch'
import FormData from 'form-data'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

async function getImageBuffer(m, conn) {
  const msg = m.message
  const types = ['imageMessage', 'ephemeralMessage', 'viewOnceMessage', 'viewOnceMessageV2']
  let imageMsg = null
  for (const t of types) {
    if (msg?.[t]) {
      imageMsg = t === 'ephemeralMessage'? msg[t]?.message?.imageMessage : t.startsWith('viewOnce')? msg[t]?.message?.imageMessage : msg[t]
      if (imageMsg) break
    }
  }
  if (!imageMsg && m.quoted) {
    const q = m.quoted
    const qMsg = q.message || q.msg || q
    for (const t of types) {
      if (qMsg?.[t]) {
        imageMsg = t === 'ephemeralMessage'? qMsg[t]?.message?.imageMessage : t.startsWith('viewOnce')? qMsg[t]?.message?.imageMessage : qMsg[t]
        if (imageMsg) break
      }
    }
    if (!imageMsg && (q.mimetype || '').startsWith('image/')) imageMsg = q
  }
  if (!imageMsg) return null
  const stream = await downloadContentFromMessage(imageMsg, 'image')
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

const handler = async (m, { conn }) => {
  await m.react('🔄')
  let imgBuffer = await getImageBuffer(m, conn)
  if (!imgBuffer) return conn.reply(m.chat, `📸 Responde a una imagen`, m)

  try {
    const form = new FormData()
    form.append('file', imgBuffer, { filename: 'image.jpg' })

    const res = await fetch('https://api.xteam.xyz/rmbg?apikey=APIKEY', {
      method: 'POST',
      body: form
    })

    if (!res.ok) throw new Error(`API Error ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())

    await conn.sendMessage(m.chat, {
      image: buffer,
      mimetype: 'image/png',
      caption: `╭─❒「 ✨ FOR THREE REMOVE BG 」
│
│ ✅ Fondo eliminado
│ 👤 Creador: Whois Yallico
╰─⬣`
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    await m.react('🔴')
    conn.reply(m.chat, `❌ Error: ${e.message}`, m)
  }
}

handler.command = /^(rmbg|bg|ftbg)$/i
handler.limit = true
export default handler