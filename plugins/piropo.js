let handler = async (m, { conn }) => {
  const piropos = [
    'Si la belleza fuera delito, tú tendrías cadena perpetua 😏',
    '¿Crees en el amor a primera vista o vuelvo a pasar? 👀',
    'Tú no eres Google, pero tienes todo lo que busco',
    'Si tú fueras ceviche, yo sería limón... pa estar encima tuyo',
    '¿Te dolió? Porque te caíste del cielo causa'
  ]
  
  let p = piropos[Math.floor(Math.random() * piropos.length)]
  m.reply(`🇵🇪 *PIROPO PERUANO* 🇵🇪\n\n${p}`)
}

handler.help = ['piropo ( Perú )']
handler.tags = ['fun']
handler.command = /^(piropo)$/i
export default handler