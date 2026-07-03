let handler = async (m, { conn, command, text }) => {
    let chat = global.db.data.chats // Usamos la db del bot para que no se borre al reiniciar

    if (!chat) global.db.data.chats = {}
    if (!chat[m.chat]) chat[m.chat] = {}
    let juego = chat[m.chat].siente

    if (command === 'siente') {
        if (juego?.activo) return m.reply('❌ Ya hay una partida activa. Usa.terminar')

        let miembros = (await conn.groupMetadata(m.chat)).participants
          .map(p => p.id)
          .filter(id => id!== conn.user.jid && id!== m.sender)

        if (miembros.length < 2) return m.reply('❌ Se necesitan mínimo 2 personas oe')

        let p1 = miembros[Math.floor(Math.random() * miembros.length)]
        let p2 = miembros.filter(v => v!== p1)[0]

        chat[m.chat].siente = { activo: true, p1, p2, turno: p1 }

        return conn.sendMessage(m.chat, {
            text: `🔥 *JUEGO: ¿QUÉ SE SIENTE?* 🔥\n\n@${p1.split('@')[0]} vs @${p2.split('@')[0]}\n\n*¿Cómo se juega?*\nEtiqueta a la otra persona cuando sea tu turno.\n\n👉 *TURNO DE:* @${p1.split('@')[0]}`,
            mentions: [p1, p2]
        })
    }

    if (command === 'terminar') {
        if (!juego?.activo) return m.reply('No hay partida activa')
        let { p1, p2 } = juego
        chat[m.chat].siente = null
        return conn.sendMessage(m.chat, {
            text: `🛑 *PARTIDA TERMINADA*\n@${p1.split('@')[0]} y @${p2.split('@')[0]} ya pararon 😅`,
            mentions: [p1, p2]
        })
    }

    // Si no es comando, es turno
    if (!juego?.activo) return
    if (m.sender!== juego.turno) return

    let otro = juego.turno === juego.p1? juego.p2 : juego.p1
    let tag = m.mentionedJid[0]

    if (tag!== otro) return m.reply(`❌ Etiqueta a @${otro.split('@')[0]}`, null, { mentions: })

    chat[m.chat].siente.turno = otro
    await m.react('😏')

    return conn.sendMessage(m.chat, {
        text: `👉 *TURNO DE:* @${otro.split('@')[0]}`,
        mentions: [otro]
    })
}

handler.help = ['siente', 'terminar']
handler.tags = ['fun']
handler.command = /^(siente|terminar)$/i
handler.group = true
export default handler