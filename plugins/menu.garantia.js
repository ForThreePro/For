let handler = async (m, { conn }) => {
  let txt = `*🛡️ [ GARANTÍA FOR THREE ]* 🛡️\n\n`
  txt += `━━━━━━━━━━\n`
  txt += `✅ *Bot 100% Funcional* al comprar\n`
  txt += `✅ *Soporte 24/7* por cualquier bug\n`
  txt += `✅ *Actualizaciones* gratis 1 mes\n`
  txt += `✅ *Te enseño a usarlo* por nota\n`
  txt += `━━━━━━━━━━\n\n`
  txt += `*Si falla en 7 días, te lo arreglo gratis.*\n\n`
  txt += `*¿Lo quieres?*.comprarbot`
  
  await conn.reply(m.chat, txt, m)
}
handler.help = ['garantia']
handler.tags = ['ventas bot']
handler.command = /^(garantia|seguro)$/i
export default handler