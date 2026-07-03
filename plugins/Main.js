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
}

handler.help = [
    'ping',
    'info',
    'sc',
    'donar'
]
handler.tags = ['main']
handler.command = ['ping', 'info', 'sc', 'script', 'donar', 'donate']
handler.cooldown = 3000 // cooldown de 3 seg para evitar spam
export default handler