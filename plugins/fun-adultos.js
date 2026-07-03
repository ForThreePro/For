let handler = async (m, { conn, command, args }) => {
    let who = m.mentionedJid[0]
    let name = await conn.getName(m.sender)
    let name2 = who? await conn.getName(who) : ''

    switch(command) {

        case 'violar': {
            if (!who) return m.reply('Menciona a quien 😈\n.violar @tag')
            let lugares = ['en el baño', 'en la cocina', 'en el parque', 'en el cuarto', 'en el carro', 'en la ducha']
            let lugar = lugares[Math.floor(Math.random() * lugares.length)]
            m.reply(`😈 ${name} violó a ${name2} ${lugar}`, null, { mentions: [m.sender, who] })
        }
        break

        case 'follar': {
            if (!who) return m.reply('Menciona a alguien 😏\n.follar @tag')
            if (who == m.sender) return m.reply('Automamada no cuenta')
            let pos = ['perrito', 'misionero', 'vaquera', '69', 'de ladito', 'contra la pared']
            let posicion = pos[Math.floor(Math.random() * pos.length)]
            m.reply(`🔥 ${name} se está follando a ${name2} en posición *${posicion}* 🔥`, null, { mentions: [m.sender, who] })
        }
        break

        case 'nalgada': {
            if (!who) return m.reply('Menciona a quien nalguear 🍑\n.nalgada @tag')
            m.reply(`👋 *PAM!* ${name} le dio una nalgada a ${name2}`, null, { mentions: [m.sender, who] })
        }
        break

        case 'lamer': {
            if (!who) return m.reply('Menciona a quien lamer 👅\n.lamer @tag')
            let partes = ['el cuello', 'las orejas', 'la panza', 'los pies', 'todo el cuerpo']
            let parte = partes[Math.floor(Math.random() * partes.length)]
            m.reply(`👅 ${name} le está lamiendo ${parte} a ${name2}`, null, { mentions: [m.sender, who] })
        }
        break

        case 'chupar': {
            if (!who) return m.reply('Menciona a quien 😏\n.chupar @tag')
            m.reply(`😏 ${name} le está chupando a ${name2}`, null, { mentions: [m.sender, who] })
        }
        break

        case 'mamar': {
            if (!who) return m.reply('Menciona a quien 😈\n.mamar @tag')
            m.reply(`🤤 ${name} le está mamando a ${name2}`, null, { mentions: [m.sender, who] })
        }
        break

        case 'tetas': {
            let size = Math.floor(Math.random() * 100)
            let copa = size > 80? 'Copa G' : size > 60? 'Copa D' : size > 40? 'Copa B' : 'Copa A'
            m.reply(`🍒 *MEDIDOR DE TETAS* 🍒\n\n${name}\nTamaño: ${size}%\n${copa}`)
        }
        break

        case 'pene': {
            let size = Math.floor(Math.random() * 30) + 1
            let barra = '═'.repeat(size) + 'D'
            m.reply(`📏 *MEDIDOR DE PENE* 📏\n\n${name}\n8${barra}\n${size} cm`)
        }
        break

        case 'culo': {
            let size = Math.floor(Math.random() * 100)
            let tipo = size > 80? 'Culote 🍑🍑' : size > 50? 'Buen culo' : 'Tabla de planchar'
            m.reply(`🍑 *MEDIDOR DE CULO* 🍑\n\n${name}\n${tipo}\n${size}%`)
        }
        break

        case 'caliente': {
            let cal = Math.floor(Math.random() * 100)
            let barra = '🔥'.repeat(cal/10) + '🧊'.repeat(10 - cal/10)
            m.reply(`🥵 *NIVEL DE CALIENTE* 🥵\n\n${name}\n[${barra}] ${cal}%`)
        }
        break
    }
}
handler.help = ['violar', 'follar', 'nalgada', 'lamer', 'chupar', 'mamar', 'tetas', 'pene', 'culo', 'caliente']
handler.tags = ['Fun +18']
handler.command = ['violar', 'follar', 'nalgada', 'lamer', 'chupar', 'mamar', 'tetas', 'pene', 'culo', 'caliente']
export default handler