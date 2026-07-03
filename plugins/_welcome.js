import { WAMessageStubType } from '@whiskeysockets/baileys'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const TU_FOTO_URL = 'https://tu-url.com/tu-foto.jpg'

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin &&!isOwner) throw "⚠️ Solo los administradores pueden usar este comando."
  let chat = global.db.data.chats[m.chat]??= {}
  if (/on/i.test(args[0])) {
    chat.bienvenida = true
    await conn.reply(m.chat, "✅ *Bienvenida activada*", m)
  } else if (/off/i.test(args[0])) {
    chat.bienvenida = false
    await conn.reply(m.chat, "❌ *Bienvenida desactivada*.", m)
  }
}

handler.command = /^(bienvenida|welcome|bye)$/i

handler.before = async function (m, { conn, groupMetadata }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return true
    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat ||!chat.bienvenida) return true

    const userJid = m.messageStubParameters?.[0] || m.participant
    if (!userJid) return true

    // 1. FOTO
    let ppUser
    try { ppUser = await conn.profilePictureUrl(userJid, 'image') }
    catch { ppUser = { url: TU_FOTO_URL } }

    const userTag = `@${userJid.split('@')[0]}`
    const groupName = groupMetadata.subject
    const membersCount = groupMetadata.participants.length
    const groupDesc = groupMetadata.desc || 'Disfruta tu estadía.'

    let txt = ''
    let audioFile = ''

    switch (m.messageStubType) {
      case WAMessageStubType.GROUP_PARTICIPANT_ADD:
        txt = `😏 *Vaya, alguien nuevo...*\n\nBienvenido ${userTag} a *${groupName}*.\n\n📂 *REGISTRO:*\n│ 👤 *Miembro:* #${membersCount}\n│ 🛠️ *Creador: Whois*\n│ 📝 *Info:* ${groupDesc}`
        audioFile = 'bienvenida.mp3' // <-- TU.MP3
        break
      case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
        txt = `🏃‍♂️ *Uno menos.*\n\n${userTag} salió de *${groupName}*.\n\n📉 *Quedamos:* ${membersCount}`
        audioFile = 'despedida.mp3' // <-- TU.MP3
        break
      case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
        txt = `⚡ *ACCESO DENEGADO*\n\n${userTag} fue expulsado de *${groupName}*.\n\n🚮 *Causa:* Estorbaba.`
        audioFile = 'despedida.mp3' // <-- TU.MP3
        break
    }

    if (txt) {
      // 2. IMAGEN
      await conn.sendMessage(m.chat, {
        image: typeof ppUser === 'string'? { url: ppUser } : ppUser,
        caption: txt,
        mentions: [userJid]
      })

      // 3. AUDIO.MP3 QUE SÍ SUENA
      const audioPath = join(process.cwd(), audioFile)
      if (existsSync(audioPath)) {
        const audioBuffer = readFileSync(audioPath)
        await conn.sendMessage(m.chat, {
          audio: audioBuffer,
          mimetype: 'audio/mpeg', // <--.MP3 normal
          ptt: false // <-- Barra gris. Si lo pones true sale naranja gris
        })
      } else {
        console.log(`❌ No existe: ${audioPath}`)
      }
    }

  } catch (e) {
    console.error("Error:", e)
  }
  return true
}

export default handler