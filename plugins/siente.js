let juegos = {}

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let chat = m.chat
    
    if (command == 'siente') {
        if (chat in juegos) return conn.reply(m.chat, '❌ Ya hay partida. Usa ' + usedPrefix + 'terminar', m)
        
        let miembros = (await conn.groupMetadata(chat)).participants.map(u => u.id).filter(v => v!== conn.user.jid && v!== m.sender)
        if (miembros.length < 2) return conn.reply(m.chat, '❌ Necesitas mínimo 2 personas más oe', m)
        
        miembros.sort(() => Math.random() - 0.5)
        let p1 = miembros[0]
        let p2 = miembros[1]
        juegos[chat] = { p1, p2, turno: p1 }
        
        return conn.sendMessage(chat, { text: `🔥 ¿QUÉ SE SIENTE? 🔥\n\n@${p1.split`@`[0]} vs @${p2.split`@`[0]}\n\n*Reglas:* Etiqueta a la otra persona para pasar turno.\n\n👉 TURNO DE: @${p1.split`@`[0]}`, mentions: [p1, p2] }, { quoted: m })
    }
    
    if (command == 'terminar') {
        if (!(chat in juegos)) return conn.reply(m.chat, 'No hay partida activa', m)
        let { p1, p2 } = juegos[chat]
        delete juegos[chat]
        return conn.sendMessage(chat, { text: `🛑 PARTIDA TERMINADA\n@${p1.split`@`[0]} y @${p2.split`@`[0]} se rindieron`, mentions: [p1, p2] }, { quoted: m })
    }
    
    if (!(chat in juegos)) return
    let juego = juegos[chat]
    if (m.sender!== juego.turno) return
    
    let otro = juego.turno == juego.p1? juego.p2 : juego.p1
    if (!m.mentionedJid[0] || m.mentionedJid[0]!== otro) return conn.reply(m.chat, `❌ Etiqueta a @${otro.split`@`[0]}`, m, { mentions: })
    
    juego.turno = otro
    await m.react('😏')
    return conn.sendMessage(chat, { text: `🔥 ¿QUÉ SE SIENTE? 🔥\n\n@${juego.p1.split`@`[0]} vs @${juego.p2.split`@`[0]}\n\n👉 TURNO DE: @${otro.split`@`[0]}`, mentions: [juego.p1, juego.p2, otro] }, { quoted: m })
}

handler.help = ['siente', 'terminar']
handler.tags = ['fun']
handler.command = /^(siente|terminar)$/i
handler.group = true
handler.fail = null

export default handler