//.violar
let violar = async (m, { conn }) => {
    if (!m.mentionedJid[0]) return m.reply('Menciona a quien 😈\n.violar @tag')
    let lugares = ['en el baño', 'en la cocina', 'en el parque', 'en el cuarto', 'en el carro', 'en la ducha']
    let lugar = lugares[Math.floor(Math.random() * lugares.length)]
    m.reply(`😈 @${m.sender.split('@')[0]} violó a @${m.mentionedJid[0].split('@')[0]} ${lugar}`, null, { mentions: [m.sender, m.mentionedJid[0]] })
}
violar.help = ['violar @tag']
violar.tags = ['+18']
violar.command = ['violar']

//.follar
let follar = async (m, { conn }) => {
    if (!m.mentionedJid[0]) return m.reply('Menciona a alguien 😏\n.follar @tag')
    if (m.mentionedJid[0] == m.sender) return m.reply('Automamada no cuenta')
    let pos = ['perrito', 'misionero', 'vaquera', '69', 'de ladito', 'contra la pared']
    let posicion = pos[Math.floor(Math.random() * pos.length)]
    m.reply(`🔥 @${m.sender.split('@')[0]} se está follando a @${m.mentionedJid[0].split('@')[0]} en posición *${posicion}* 🔥`, null, { mentions: [m.sender, m.mentionedJid[0]] })
}
follar.help = ['follar @tag']
follar.tags = ['+18']
follar.command = ['follar']

//.nalgada
let nalgada = async (m, { conn }) => {
    if (!m.mentionedJid[0]) return m.reply('Menciona a quien nalguear 🍑\n.nalgada @tag')
    m.reply(`👋 *PAM!* @${m.sender.split('@')[0]} le dio una nalgada a @${m.mentionedJid[0].split('@')[0]}`, null, { mentions: [m.sender, m.mentionedJid[0]] })
}
nalgada.help = ['nalgada @tag']
nalgada.tags = ['+18']
nalgada.command = ['nalgada']

//.lamer
let lamer = async (m, { conn }) => {
    if (!m.mentionedJid[0]) return m.reply('Menciona a quien lamer 👅\n.lamer @tag')
    let partes = ['el cuello', 'las orejas', 'la panza', 'los pies', 'todo el cuerpo']
    let parte = partes[Math.floor(Math.random() * partes.length)]
    m.reply(`👅 @${m.sender.split('@')[0]} le está lamiendo ${parte} a @${m.mentionedJid[0].split('@')[0]}`, null, { mentions: [m.sender, m.mentionedJid[0]] })
}
lamer.help = ['lamer @tag']
lamer.tags = ['+18']
lamer.command = ['lamer']

//.chupar
let chupar = async (m, { conn }) => {
    if (!m.mentionedJid[0]) return m.reply('Menciona a quien 😏\n.chupar @tag')
    m.reply(`😏 @${m.sender.split('@')[0]} le está chupando a @${m.mentionedJid[0].split('@')[0]}`, null, { mentions: [m.sender, m.mentionedJid[0]] })
}
chupar.help = ['chupar @tag']
chupar.tags = ['+18']
chupar.command = ['chupar']

//.mamar
let mamar = async (m, { conn }) => {
    if (!m.mentionedJid[0]) return m.reply('Menciona a quien 😈\n.mamar @tag')
    m.reply(`🤤 @${m.sender.split('@')[0]} le está mamando a @${m.mentionedJid[0].split('@')[0]}`, null, { mentions: [m.sender, m.mentionedJid[0]] })
}
mamar.help = ['mamar @tag']
mamar.tags = ['+18']
mamar.command = ['mamar']

//.tetas
let tetas = async (m, { conn }) => {
    let who = m.mentionedJid[0] || m.sender
    let size = Math.floor(Math.random() * 100)
    let copa = size > 80? 'Copa G 🍒🍒' : size > 60? 'Copa D 🍒' : size > 40? 'Copa B' : 'Copa A'
    m.reply(`🍒 *MEDIDOR DE TETAS* 🍒\n\n@${who.split('@')[0]}\nTamaño: ${size}%\n${copa}`, null, { mentions: [who] })
}
tetas.help = ['tetas @tag']
tetas.tags = ['+18']
tetas.command = ['tetas']

//.pene
let pene = async (m, { conn }) => {
    let who = m.mentionedJid[0] || m.sender
    let size = Math.floor(Math.random() * 30) + 1
    let barra = '═'.repeat(size) + 'D'
    m.reply(`📏 *MEDIDOR DE PENE* 📏\n\n@${who.split('@')[0]}\n8${barra}\n${size} cm`, null, { mentions: [who] })
}
pene.help = ['pene @tag']
pene.tags = ['+18']
pene.command = ['pene']

//.culo
let culo = async (m, { conn }) => {
    let who = m.mentionedJid[0] || m.sender
    let size = Math.floor(Math.random() * 100)
    let tipo = size > 80? 'Culote 🍑🍑' : size > 50? 'Buen culo 🍑' : 'Tabla de planchar'
    m.reply(`🍑 *MEDIDOR DE CULO* 🍑\n\n@${who.split('@')[0]}\n${tipo}\n${size}%`, null, { mentions: [who] })
}
culo.help = ['culo @tag']
culo.tags = ['+18']
culo.command = ['culo']

//.caliente
let caliente = async (m, { conn }) => {
    let who = m.mentionedJid[0] || m.sender
    let cal = Math.floor(Math.random() * 100)
    let barra = '🔥'.repeat(Math.floor(cal/10)) + '🧊'.repeat(10 - Math.floor(cal/10))
    m.reply(`🥵 *NIVEL DE CALIENTE* 🥵\n\n@${who.split('@')[0]}\n[${barra}] ${cal}%`, null, { mentions: [who] })
}
caliente.help = ['caliente @tag']
caliente.tags = ['+18']
caliente.command = ['caliente']

export default [violar, follar, nalgada, lamer, chupar, mamar, tetas, pene, culo, caliente]