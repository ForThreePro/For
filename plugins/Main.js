let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.sender

    if (command == 'ping') {
        let start = new Date * 1
        await m.reply('🏓 PING...')
        let end = new Date * 1
        m.reply(`*For Three Bot 🌀*\n*Velocidad:* ${end - start} ms\n*Estado:* Activo ✅`)
    }

    if (command == 'info') {
        let texto = `╭━━━〔 *FOR THREE BOT 🌀* 〕━━━⬣
┃ 🤖 *Bot:* For Three Bot
┃ ⚡ *Prefijo:* ${usedPrefix}
┃ 👑 *Dueño:* Whois Yallico
┃ 📦 *Versión:* 1.0
┃ 📅 *Fecha:* ${new Date().toLocaleDateString('es')}
╰━━━━━━━━━━━━⬣`
        return conn.reply(m.chat, texto, m, { mentions: [global.owner[0] + '@s.whatsapp.net'] })
    }

    if (command == 'sc' || command == 'script') {
        m.reply(`*FOR THREE BOT 🌀*\n*SCRIPT:* Privado\nContacta a Whois Yallico para más info`)
    }

    if (command == 'donar' || command == 'donate') {
        let texto = `*APOYAR A FOR THREE BOT 🌀* 💰\n\n*YAPE:* +51 936 994 155\n*Nombre:* Cristhofer Rojas\nCualquier donación ayuda a mantener el bot activo 🫶\nGracias crack!`
        m.reply(texto)
    }

    if (command == 'estadisticas' || command == 'stats') {
        let uptime = process.uptime()
        let horas = Math.floor(uptime / 3600)
        let minutos = Math.floor(uptime / 60) % 60
        m.reply(`*STATS FOR THREE BOT 🌀* 📊\n\n*Uptime:* ${horas}h ${minutos}m\n*Usuarios:* ${Object.keys(global.db.data.users).length}\n*Chats:* ${Object.keys(conn.chats).length}`)
    }
}

handler.help = [
    'ping',
    'info',
    'sc',
    'donar',
    'estadisticas'
]
handler.tags = ['main']
handler.command = ['ping', 'info', 'sc', 'script', 'donar', 'donate', 'estadisticas', 'stats']
export default handler