let handler = async (m, { conn }) => {
  const imgUrl = 'https://files.evogb.win/7Rs2Rz.jpg'

  let txt = `
*📂 SELECCIONA UNA CATEGORÍA*

Elige una categoría para ver sus comandos 👇
`.trim()

  let buttons = [
    { buttonId: '.menu cat fun', buttonText: { displayText: '🎮 JUEGOS FUN' }, type: 1 },
    { buttonId: '.menu cat info', buttonText: { displayText: 'ℹ️ INFO' }, type: 1 },
    { buttonId: '.menu cat main', buttonText: { displayText: '⚙️ MAIN' }, type: 1 },
    { buttonId: '.menu cat sorteos', buttonText: { displayText: '🎁 SORTEOS' }, type: 1 },
    { buttonId: '.menu cat ventas bot', buttonText: { displayText: '🛒 VENTAS' }, type: 1 },
    { buttonId: '.menu', buttonText: { displayText: '⬅️ VOLVER' }, type: 1 }
  ]

  await conn.sendMessage(m.chat, {
    image: { url: imgUrl },
    caption: txt,
    footer: 'Toca una categoría',
    buttons: buttons,
    headerType: 4,
  }, { quoted: m })
}

handler.command = /^(menu\s?categorias)$/i
export default handler