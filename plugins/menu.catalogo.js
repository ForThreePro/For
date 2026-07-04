let handler = async (m, { conn }) => {
  let txt = `*📋 [ CATÁLOGO FOR THREE ]*\n\n`
  txt += `*🥉 Bot Para Grupo S/5\n> Bot limpio +100 cmds funcionales\n`
  txt += `*🥈 Servidor Hosting* S/10\n> Servidor Activo 24/7\n`
  txt += `*🥇 Bot Personalizado* S/30\n> Bot full + Menú custom + Tu logo + servidor gratis 1 Mes\n`
  txt += `*Paga al:* Yape +51 936 994 155\n`
  txt += `*Comprar:*.comprarbot`
  m.reply(txt)
}
handler.help = ['catalogo']
handler.tags = ['ventas bot']
handler.command = /^(catalogo|planes)$/i
export default handler