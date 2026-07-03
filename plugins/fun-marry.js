import { areJidsSameUser } from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix, args }) => {
    if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos');

    let chat = global.db.data.chats[m.chat]??= {}
    chat.matrimonios = chat.matrimonios || {}
    chat.pedidas = chat.pedidas || {}

    let quien = m.sender
    let conQuien = m.mentionedJid?.[0]

    // ===== PEDIR =====
    if (/^pedir$/i.test(m.text.split(' ')[0].slice(1))) {
        if (!conQuien) return m.reply(`❌ Etiqueta a quien le quieres pedir matrimonio\n*Ejemplo:* ${usedPrefix}pedir @user`)
        if (areJidsSameUser(conQuien, quien)) return m.reply('❌ No te puedes casar contigo mismo xd')
        if (chat.matrimonios[quien]) return m.reply('❌ Ya estás casado')
        if (chat.matrimonios[conQuien]) return m.reply(`❌ @${conQuien.split('@')[0]} ya está casado/a`, null, { mentions: [conQuien] })
        if (chat.pedidas[conQuien]) return m.reply('❌ Esa persona ya tiene una propuesta pendiente')

        chat.pedidas[conQuien] = quien

        return m.reply(`
╭───────────────────╮
│ 💍 *PEDIDA DE MANO* 💍 │
╰───────────────────╯

@${quien.split('@')[0]} le ha pedido matrimonio a @${conQuien.split('@')[0]}

@${conQuien.split('@')[0]} usa *${usedPrefix}aceptar* o *${usedPrefix}rechazar*
        `.trim(), null, { mentions: [quien, conQuien] })
    }

    // ===== ACEPTAR =====
    if (/^aceptar$/i.test(m.text.split(' ')[0].slice(1))) {
        let pedidor = chat.pedidas[quien]
        if (!pedidor) return m.reply('❌ No tienes ninguna solicitud de matrimonio pendiente')

        chat.matrimonios[quien] = pedidor
        chat.matrimonios[pedidor] = quien
        delete chat.pedidas[quien]

        return m.reply(`
╭───────────────────╮
│ 💒 *SE CASARON* 💒 │
╰───────────────────╯

💕 @${pedidor.split('@')[0]} y @${quien.split('@')[0]} ahora están casados! 🥂
        `.trim(), null, { mentions: [pedidor, quien] })
    }

    // ===== RECHAZAR =====
    if (/^rechazar$/i.test(m.text.split(' ')[0].slice(1))) {
        let pedidor = chat.pedidas[quien]
        if (!pedidor) return m.reply('❌ No tienes ninguna solicitud de matrimonio pendiente')
        delete chat.pedidas[quien]
        return m.reply(`💔 @${quien.split('@')[0]} rechazó a @${pedidor.split('@')[0]}`, null, { mentions: [quien, pedidor] })
    }

    // ===== DIVORCIO =====
    if (/^divorcio$/i.test(m.text.split(' ')[0].slice(1))) {
        let pareja = chat.matrimonios[quien]
        if (!pareja) return m.reply('❌ No estás casado con nadie')
        delete chat.matrimonios[quien]
        delete chat.matrimonios[pareja]
        return m.reply(`💔 @${quien.split('@')[0]} y @${pareja.split('@')[0]} se divorciaron`, null, { mentions: [quien, pareja] })
    }

    // ===== PAREJA =====
    if (/^pareja$/i.test(m.text.split(' ')[0].slice(1))) {
        let objetivo = conQuien || quien
        let pareja = chat.matrimonios[objetivo]
        if (!pareja) return m.reply(`@${objetivo.split('@')[0]} está soltero/a`, null, { mentions: [objetivo] })
        return m.reply(`💍 @${objetivo.split('@')[0]} está casado con @${pareja.split('@')[0]}`, null, { mentions: [objetivo, pareja] })
    }
}

handler.help = ['pedir @user', 'aceptar', 'rechazar', 'divorcio', 'pareja @user'];
handler.tags = ['fun'];
handler.command = /^(pedir|aceptar|rechazar|divorcio|pareja)$/i; // <- Importante para que agarre el.
handler.group = true;
export default handler;