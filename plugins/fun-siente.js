let juegos = {} // Memoria del juego por grupo

let handler = async (m, { conn, command, mentionedJid }) => {
    let chat = m.chat

    // 1. COMANDO.TERMINAR
    if (command === 'terminar') {
        if (juegos) {
            let p1 = juegos.p1
            let p2 = juegos.p2
            delete juegos
            return conn.sendMessage(chat, { text: `🛑 *JUEGO TERMINADO*\n@${p1.split('@')[0]} y @${p2.split('@')[0]} ya no se sienten más 😅`, mentions: [p1, p2] })
        }
        return
    }

    // 2. COMANDO.SIENTE - INICIAR JUEGO
    if (command === 'siente') {
        if (juegos) return m.reply('❌ Ya hay un juego activo. Usen.terminar pa' + ' acabar')

        let p1, p2;

        // SI TAGGEAS A 2 PERSONAS, LOS ELIGES TÚ
        if (mentionedJid.length >= 2) {
            p1 = mentionedJid[0]
            p2 = mentionedJid[1]
            if (p1 === p2) return m.reply('❌ No puedes elegir a la misma persona 2 veces oe')
        } else {
            // SI NO TAGGEAS, EL BOT ELIGE RANDOM - AHORA CON ADMINS
            let metadata = await conn.groupMetadata(chat)
            let miembros = metadata.participants
           .filter(p => p.id!== conn.user.jid && p.id!== m.sender) // <- QUITÉ!p.admin
           .map(p => p.id)

            if (miembros.length < 2) return m.reply('❌ Se necesitan mínimo 2 personas más en el grupo oe')

            p1 = miembros[Math.floor(Math.random() * miembros.length)]
            p2 = miembros.filter(v => v!== p1)[Math.floor(Math.random() * (miembros.length - 1))]
        }

        juegos = {
            p1, p2,
            turno: p1, // Empieza p1
            activo: true
        }

        return conn.sendMessage(chat, { text: `🔥 *JUGUEMOS AL QUE SE SIENTE* 🔥\n\n@${p1.split('@')[0]} vs @${p2.split('@')[0]}\n\n👉 Empieza @${p1.split('@')[0]}\nResponde a este mensaje etiquetando a @${p2.split('@')[0]}\n\nTip: Pongan.terminar pa' acabar`, mentions: [p1, p2] })
    }

    // 3. LÓGICA DE TURNO
    if (!juegos ||!juegos.activo) return
    let game = juegos

    if (m.sender!== game.turno ||!m.quoted ||!m.quoted.fromMe) return

    let mencionado = m.mentionedJid[0]
    let otro = game.turno === game.p1? game.p2 : game.p1

    if (mencionado!== otro) return conn.sendMessage(chat, { text: `❌ Etiqueta a @${otro.split('@')[0]} pe`, mentions: })

    // 4. CAMBIAR TURNO
    game.turno = otro
    await m.react('😏')

    return conn.sendMessage(chat, { text: `👉 Te toca @${otro.split('@')[0]}\nResponde a este mensaje etiquetando a @${game.turno === game.p1? game.p2 : game.p1}`, mentions: [otro, game.turno === game.p1? game.p2 : game.p1] })
}

handler.help = ['siente @tag @tag', 'terminar']
handler.tags = ['fun']
handler.command = ['siente', 'terminar']
handler.group = true
export default handler