let handler = async (m, { conn, usedPrefix, command, args, text }) => {
  let taguser = '@' + m.sender.split('@')[0]

  // [1] AGRUPAR TODO
  let plugins = Object.values(global.plugins).filter(p =>!p.disabled && p.help)
  let groups = {}
  for (let p of plugins) {
    for (let tag of p.tags || ['main']) {
      if (!(tag in groups)) groups[tag] = []
      groups[tag].push(...[].concat(p.help))
    }
  }
  let categories = Object.keys(groups).sort()
  let input = (args[0] || text || '').toLowerCase().trim()

  // [NIVEL 2].CATEGORIAS FUN -> MUESTRA COMANDOS
  if (input && categories.includes(input)) {
    let txt = `*🤖 [ ${input.toUpperCase()} ]*\n\n`
    txt += `👤 ${taguser} | Total: ${groups[input].length} comandos\n`
    txt += groups[input].map(v => `> 🌀 ${usedPrefix}${v}`).join('\n')
    txt += `\n\n_Usa ${usedPrefix}categorias para volver_`
    return conn.reply(m.chat, txt, m, { mentions: [m.sender] })
  }

  // [NIVEL 1].CATEGORIAS -> MUESTRA LA LISTA
  let rows = categories.map(tag => ({
    title: `🗂️ ${tag.toUpperCase()}`,
    rowId: `${usedPrefix}categorias ${tag}`, // <-- Al tocar ejecuta esto
    description: `${groups[tag].length} comandos`
  }))

  return conn.sendMessage(m.chat, {
    text: `🤖 *For Three Bot*\n\n👋 Hola ${taguser}\nElige una categoría:`,
    footer: 'For Three Bot v3 🌀',
    title: '📜 MENÚ DE CATEGORÍAS',
    buttonText: '🔍 TOCA AQUÍ',
    sections: [{title: `Categorías [${categories.length}]`, rows}],
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['categorias']
handler.tags = ['main']
handler.command = /^(categorias|cmds|menu2)$/i // <-- CLAVE: Agarra.categorias.categorias fun
export default handler