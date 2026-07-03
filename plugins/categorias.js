console.log('PLUGIN CATEGORIAS CARGADO ✅') // <-- Si no sale esto en consola, el archivo está mal

let handler = async (m, { conn, usedPrefix, args, text }) => {
  console.log('COMANDO CATEGORIAS EJECUTADO ✅') // <-- Si sale esto, el regex sí agarra

  let taguser = '@' + m.sender.split('@')[0]

  // [1] AGRUPAR TODO
  let plugins = Object.values(global.plugins).filter(p =>!p.disabled && p.help)
  console.log('Total plugins:', plugins.length) // <-- Debe salir > 0

  let groups = {}
  for (let p of plugins) {
    for (let tag of p.tags || ['main']) {
      if (!(tag in groups)) groups[tag] = []
      groups[tag].push(...[].concat(p.help))
    }
  }
  let categories = Object.keys(groups).sort()
  console.log('Categorias encontradas:', categories) // <-- Debe salir ['main', 'fun', etc]

  let input = (args[0] || '').toLowerCase().trim()

  // [NIVEL 2]
  if (input && categories.includes(input)) {
    let txt = `*🤖 [ ${input.toUpperCase()} ]*\n\n> ${groups[input].map(v => `${usedPrefix}${v}`).join('\n')}`
    return conn.reply(m.chat, txt, m)
  }

  // [NIVEL 1] SI NO HAY CATEGORIAS
  if (categories.length === 0) {
    return conn.reply(m.chat, '❌ No se encontraron categorías. Revisa tus plugins.', m)
  }

  // MANDAR LISTA
  let rows = categories.map(tag => ({
    title: `🗂️ ${tag.toUpperCase()}`,
    rowId: `${usedPrefix}categorias ${tag}`,
    description: `${groups[tag].length} cmds`
  }))

  console.log('Mandando lista con:', rows.length, 'categorias') // <-- Debe salir > 0

  return conn.sendMessage(m.chat, {
    text: `🤖 *For Three Bot*\n\n👋 Hola ${taguser}\nElige una categoría:`,
    footer: 'For Three Bot v3 🌀',
    title: '📜 MENÚ',
    buttonText: '🔍 TOCA AQUÍ',
    sections: [{title: `Categorías [${categories.length}]`, rows}],
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['categorias']
handler.tags = ['main']
handler.command = /^(categorias|cmds)$/i // <-- Agarra.categorias y.cmds
export default handler