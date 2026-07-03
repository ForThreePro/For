let juegos = {}

let handler = async (m, { conn, command }) => {
    let chat = m.chat

    if (command === 'siente') {
        if (juegos) return m.reply('❌ Ya hay una partida activa. Usa.terminar para acabar')

        let miembros = (await conn.groupMetadata(chat)).participants
           .map(p => p.id)
           .filter(id => id!== conn.user.jid && id!== m.sender)

        if (miembros.length < 2) return m.reply('❌ Se necesitan mínimo 2 personas en el grupo oe')

        // Elegir 2 random
        let p1 = miembros[Math.floor(Math.random() * miembros.length)]
        let p2 = miembros.filter(v => v!== p1)[Math.floor(Math.random() * (miembros.length - 1))]

        juegos = { p1, p2, turno: p1 }

        return conn.sendMessage(chat, {
            text: `🔥 *JUEGO: ¿QUÉ SE SIENTE?* 🔥\n\n@${p1.split('@')[0]} vs @${p2.split('@')[0]}\n\n*¿Cómo se juega?*\nCuando te toque, tienes que responder etiquetando a la otra persona.\nEl que no responda pierde 😏\n\n👉 *TURNO DE:* @${p1.split('@')[0]}\nEtiqueta a @${p2.split('@')[0]} para pasar el turno\n.siente = Iniciar |.terminar = Acabar`,
            mentions: [p1, p2]
        })
    }

    if (command === 'terminar') {
        if (!juegos) return m.reply('No hay partida activa')
        let { p1, p2 } = juegos
        delete juegos
        return conn.sendMessage(chat, {
            text: `🛑 *PARTIDA TERMINADA*\n@${p1.split('@')[0]} y @${p2.split('@')[0]} ya no se sienten 😅`,
            mentions: [p1, p2]
        })
    }

    // Lógica de turnos
    let juego = juegos
    if (!juego) return
    if (m.sender!== juego.turno) return m.reply(`❌ No es tu turno oe. Le toca a @${juego.turno.split('@')[0]}`, null, { mentions: [juego.turno] })

    let otro = juego.turno === juego.p1? juego.p2 : juego.p1
    let tag = m.mentionedJid[0]

    if (tag!== otro) return m.reply(`❌ Tienes que etiquetar a @${otro.split('@')[0]} pe`, null, { mentions: [otro] })

    // Cambiar turno
    juego.turno = otro
    await m.react('😏')

    return conn.sendMessage(chat, {
        text: `👉 *AHORA LE TOCA A:* @${otro.split('@')[0]}\nEtiqueta a @${juego.turno === juego.p1? juego.p2 : juego.p1}`,
        mentions: [otro, juego.turno === juego.p1? juego.p2 : juego.p1]
    })
}

handler.help = ['siente', 'terminar']
handler.tags = ['fun']
handler.command = ['siente', 'terminar']
handler.group = true
export default handler