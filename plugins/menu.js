let handler = async (m, { conn, usedPrefix }) => {
  const imgUrl = 'https://files.evogb.win/7Rs2Rz.jpg'
  let taguser = '@' + m.sender.split('@')[0]

  let plugins = Object.values(global.plugins).filter(p =>!p.disabled && p.help)
  let categories = {}
  let totalCmds = 0

  // ESCANEA TODO Y AGRUPA POR TAGS
  for (let plugin of plugins) {
    let tags = plugin.tags || ['sin categoria']
    let helps = [].concat(plugin.help).filter(Boolean)
    totalCmds += helps.length

    tags.forEach(tag => {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...helps)
    })
  }

  let uptime = process.uptime()
  let h = Math.floor(uptime / 3600)
  let m_ = Math.floor(uptime % 3600 / 60)

  // EMOJIS AUTOMÁTICOS PARA CUALQUIER CATEGORÍA
  const getEmoji = (cat) => {
    cat = cat.toLowerCase()
    if(cat.includes('fun')) return '🎮'
    if(cat.includes('info')) return 'ℹ️'
    if(cat.includes('main')) return '⚙️'
    if(cat.includes('sorteo')) return '🎁'
    if(cat.includes('venta')) return '🛒'
    if(cat.includes('group') || cat.includes('grupo')) return '👥'
    if(cat.includes('down') || cat.includes('descarga')) return '📥'
    if(cat.includes('rg') || cat.includes('registro')) return '👤'
    if(cat.includes('game') || cat.includes('juego')) return '🎯'
    if(cat.includes('admin')) return '👑'
    if(cat.includes('anime')) return '🎌'
    if(cat.includes('search') || cat.includes('buscar')) return '🔍'
    if(cat.includes('sticker')) return '🏷️'
    if(cat.includes('tools') || cat.includes('herramienta')) return '🛠️'
    return '🗂️' // emoji por defecto
  }

  // ARMAMOS EL MENÚ
  let txt = `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃ 🤖 FOR THREE BOT v3.2 ┃
┗━━━━━━━━━━━━━━━━━━━━━┛

👤 *Usuario:* ${taguser}
⚙️ *Prefijo:* [${usedPrefix}]
⏱️ *Activo:* ${h}h ${m_}m
📦 *Total Comandos:* ${totalCmds}
📂 *Categorías:* ${Object.keys(categories).length}

━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim() + '\n\n'

  // ORDENA LAS CATEGORÍAS ALFABÉTICAMENTE
  let sortedCats = Object.keys(categories).sort()

  for (let cat of sortedCats) {
    let cmds = [...new Set(categories[cat])].sort()
    let emoji = getEmoji(cat)
    let titulo = `${emoji} ${cat.toUpperCase()}`

    txt += `*${titulo}* [${cmds.length}]\n`
    txt += `┌────────────────\n`
    cmds.forEach(cmd => {
      txt += `│ 🌀 ${usedPrefix}${cmd}\n`
    })
    txt += `└────────────────\n\n`
  }

  txt += `━━━━━━━━━
> *Tip:* Usa ${usedPrefix}comando para ejecutar
> *Comprar Bot:* https://bandidope.github.io/For-Three-Bot
`

  await conn.sendMessage(m.chat, {
    image: { url: imgUrl },
    caption: txt,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.command = /^(menu|menú|help)$/i
handler.tags = ['main']
handler.help = ['menu']
export default handler