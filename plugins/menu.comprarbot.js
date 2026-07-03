let handler = async (m, { conn }) => {
  let txt = `*🛒 [ VENTA DE BOTS FOR THREE ]* 🛒\n\n`
  txt += `━━━━━━━━━━\n`
  txt += `🤖 *Bot For Three MD* Full Plugins\n`
  txt += `💰 *Precio:* S/15 soles o $4 USD\n`
  txt += `📦 *Incluye:* +40 Comandos, Menú, Autoresponder\n`
  txt += `⚡ *Instalación:* 10 min vía Termux/Pc\n`
  txt += `🛡️ *Soporte:* 7 días gratis\n`
  txt += `━━━━━━━━━━\n\n`
  txt += `👤 *Vendedor:* Yallico\n`
  txt += `📱 *WhatsApp:* wa.me/51936994155\n`
  txt += `👥 *Grupo:* https://chat.whatsapp.com/LjPhgjqCM934QEzYz3vrVk\n\n`
  txt += `> *Info:*.catalogo | *Garantía:*.garantia`
  
  await conn.reply(m.chat, txt, m)
}
handler.help = ['comprarbot']
handler.tags = ['ventas bot'] // <-- CATEGORÍA NUEVA
handler.command = /^(comprarbot|preciosbot|comprar)$/i
export default handler