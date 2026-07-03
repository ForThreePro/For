let juego = null

let handler = async (m, { conn, command }) => {
    let chat = m.chat

    if (command === 'siente') {
        if (juego) return m.reply('❌ Ya hay juego. Usa.terminar')
        let members = (await conn.groupMetadata(chat)).participants.map(p => p.id).filter(id => id!== conn.user.jid && id!== m.sender)
        if (members.length < 2) return m.reply('❌ Faltan 2 personas mínimo')
        let p1 = members[Math.floor(Math.random() * members.length)]
        let p2 = members.filter(v => v!== p1)[0]
        juego = { p1, p2, turno: p1 }
        return conn.sendMessage(chat, { text: `🔥 *JUGUEMOS AL QUE SE SIENTE* 🔥\n\n@${p1.split('@')[0]} vs @${p2.split('@')[0]}\n\n👉 Turno: @${p1.split('@')[0]}\nEtiqueta a @${p2.split('@')[0]}`, mentions: [p1, p2] })
    }

    if (command === 'terminar') {
        if (!juego) return m.reply('No hay juego')
        let p1 = juego.p1
        let p2 = juego.p2
        juego = null
        return conn.sendMessage(chat, { text: `🛑 *JUEGO TERMINADO*\n@${p1.split('@')[0]} y @${p2.split('@')[0]} pararon 😅`, mentions: [p1, p2] })
    }

    if (!juego) return
    if (m.sender!== juego.turno) return m.reply('❌ No es tu turno oe')

    try { // FIX CLAVE: Para que no se caiga el bot si no hay tag
        let mencionado = m.mentionedJid[0]
        let otro = juego.turno === juego.p1? juego.p2 : juego.p1

        if (!mencionado || mencionado!== otro) return m.reply(`❌ Etiqueta bien a @${otro.split('@')[0]} pe`, null, { mentions: })

        juego.turno = otro
        await m.react('😏')

        // AQUÍ EL BOT MANDA EL TURNO DEL OTRO SÍ O SÍ
        return conn.sendMessage(chat, { text: `👉 Ahora te toca @${otro.split('@')[0]}\nEtiqueta a @${juego.turno === juego.p1? juego.p2 : juego.p1}`, mentions: [otro, juego.turno === juego.p1? juego.p2 : juego.p1] })

    } catch (e) {
        return m.reply('❌ Tienes que etiquetar a alguien pe')
    }
}

handler.command = ['siente', 'terminar']
handler.group = true
export default handler