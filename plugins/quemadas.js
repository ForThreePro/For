let used = { frases: [], usuarios: [] } // memoria temporal

let handler = async (m, { conn }) => {
    let quien = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.sender

    let base = [
        "tiene novio y lo engaña con 3 más 🤡",
        "dice que es fiel pero responde a todos en pv 👀",
        "juró amor eterno y al día siguiente subió historia con otro 🥴",
        "es el/la rey/reina del 'solo somos amigos' 📌",
        "tiene novio pero en tinder sale como soltero/a 💀",
        "dice 'no me gustas' pero stalkea 24/7 🕵️",
        "manda 'buenos días amor' a 5 personas distintas ☀️",
        "bloquea al ex pero crea cuentas falsas para verlo 👻",
        "dice que está ocupado pero visto a las 3am en línea 🌙",
        "juró que no usa cuernos... los presta nomás 🐮",
        "pone 'en una relación' pero coquetea en comentarios 😏",
        "dice 'te amo' y 2 min después 'jaja mentira' 💔",
        "tiene novio y su mejor amigo es su plan B 🤝",
        "dice que no le escribe... pero tiene 10 chats archivados 📂",
        "prometió no mentir más... y falló en el minuto 1 🤥",
        "dice 'eres el único' mientras guarda contactos como 'Taxi' 🚕",
        "sube frases de lealtad pero vive de infidelidad 📖",
        "dice 'confía en mí' = 'no revises mi cel' 📱",
        "termina y a las 2 horas ya tiene reemplazo 🔄",
        "dice 'fue un error' pero lo repite cada finde 🍻",
        "tiene novio pero su 'primo' le da like a todo 🔥",
        "dice que odia los cachos pero colecciona cuernos 🐮",
        "su relación es como wifi: todos se conectan menos el novio 📶",
        "dice 'estoy en casa' desde un hotel 🏨",
        "su fidelidad dura lo que un estado de 24h ⏰",
        "dice que no es celosa... pero revisa hasta el spam 📧",
        "tiene novio y 4 'amigos' que le pagan las salidas 💸",
        "jura que no habla con exs... tiene 3 grupos con ellos 👥",
        "su frase favorita: 'fue sin querer queriendo' 😇",
        "dice que no toma... pero cada finde aparece en historias 🍻",
        "bloqueó al novio para poder hablar con todos 🚫",
        "su lema: 'si no hay pruebas, no pasó' 📸",
        "dice que está gorda de amor... de 3 amores 🥰",
        "tiene novio fijo y 2 de repuesto 🛠️",
        "dice 'no me celes' y sube foto con otro 😈",
        "su estado: 'soltera' pero con anillo 💍",
        "jura que no miente... es creativa con la verdad 🎭",
        "dice que no le gustan... pero cae con todos 😏",
        "su novio cree que es santa y ella es el diablo 😈",
        "dice 'amor' a todos para no confundirse 💘",
        "tiene GPS para el novio pero ella apaga el suyo 📍",
        "dice que no usa apps... tiene 3 perfiles falsos 👤",
        "su relación es a distancia: él en casa, ella de fiesta 🎉",
        "dice que respeta... pero no respeta ni las horas ⏰",
        "jura que es una sola... en cada grupo diferente 🤹",
        "dice 'no me busques' y sube indirectas todo el día 📢",
        "tiene novio y un 'mejor amigo' que duerme en su casa 🛏️",
        "dice que no cree en el amor... pero se enamora cada semana 💕",
        "su fidelidad es como señal: se va cuando más la necesitas 📶",
        "dice 'no tengo tiempo' pero responde en 2 segundos ⚡",
        "jura que no coquetea... su coqueteo es profesional 😘",
        "tiene novio y un 'ex' que nunca fue ex 💔",
        "dice que no es tóxica... es química pura 🧪",
        "su excusa: 'estaba aburrida' para todo 🥱",
        "dice que no stalkea... es investigación privada 🔍",
        "tiene novio y un crush en cada app ❤️",
        "jura que no sale... sale pero no dice 🫢",
        "dice 'confía' y cambia la contraseña cada día 🔐",
        "su relación: él paga, ella engaña 💳",
        "dice que no le importa... y llora por todo 😭",
        "tiene novio y un 'compañero de trabajo' muy unido 💼",
        "jura que no bebe... el alcohol la delata 🍷",
        "dice 'no me mientas' mientras miente descaradamente 🤥",
        "su amor es como meme: se hace viral rápido 📲",
        "dice que no tiene tiempo para 2... y maneja 4 🕒",
        "tiene novio y un 'amigo' que le da consejos de amor 🧠",
        "jura que no es infiel... es multi-fiel 💞",
        "dice 'eres diferente' a todos los diferentes ✨",
        "su corazón tiene WiFi: se conecta a cualquiera 📡",
        "dice que no besa... pero reparte besos 😗",
        "tiene novio y un plan C por si falla el B 📋",
        "jura que no le escribe... él le escribe primero 📨",
        "dice 'no soy así' y es exactamente así 😌",
        "su lealtad se vence cada 24 horas 🗓️",
        "dice que no sale de noche... sale de madrugada 🌌",
        "tiene novio y un 'seguidor' que la banca siempre 👑",
        "jura que no ve estados... ve todos y 2 veces 👀",
        "dice 'no me celes' mientras provoca celos 😈",
        "su relación es temporal: como las historias ⏳",
        "dice que no le gusta la mentira... la practica 🤡",
        "tiene novio y un 'amigo' que paga todo 💰",
        "jura que no coquetea... coquetea dormida 😴",
        "dice 'no me busques problemas' y los causa todos 🔥",
        "su fidelidad: edición limitada, solo 1 día 📆",
        "dice que no tiene secretos... tiene capítulos 📚",
        "tiene novio y un 'cliente' que la invita 😏",
        "jura que no habla mal... habla peor 🤐",
        "dice 'no me uses' y usa a todos 🧽",
        "su amor es como oferta: 2x1 siempre 🏷️",
        "dice que no es interesada... solo por interés 💵",
        "tiene novio y un 'contacto de emergencia' 24/7 🚨",
        "jura que no miente... omite la verdad 🙊",
        "dice 'no me compares' y se compara con todas 📊",
        "su relación: modo avión cuando conviene ✈️",
        "dice que no es fácil... pero pone fácil 😬",
        "tiene novio y un 'amigo' que la espera siempre ⏳",
        "jura que no hace daño... hace bastante 💣",
        "dice 'no me celes' y sube foto con el ex 📷",
        "su corazón: cupos disponibles todo el año 🎟️",
        "dice que no es doble cara... tiene varias 😎",
        "tiene novio y un 'primo' que la recoge tarde 🚗",
        "jura que no es tóxica... es veneno puro ☠️",
        "dice 'no me busques' y deja el visto 💬",
        "su amor: suscripción mensual, se renueva sola 🔄",
        "dice que no engaña... reinventa la fidelidad 🎨",
        "tiene novio y un 'amigo' que sabe todo 🕵️",
        "jura que no es interesada... cobra en cariño 💝",
        "dice 'no me mientas' y miente en 4 idiomas 🌍",
        "su relación: modo incógnito activado 🥷",
        "dice que no es fácil... difícil es encontrarle 1 solo 😵",
        "tiene novio y un 'padrino' que la consiente 👔",
        "jura que no coquetea... es su forma de saludar 👋",
        "dice 'no me uses' y usa hasta el cargador 🔌",
        "su fidelidad: prueba gratis de 7 días 🆓",
        "dice que no tiene tiempo... y se da tiempo para todos ⏱️",
        "tiene novio y un 'amigo' que le enseña a mentir 🎓",
        "jura que no es así... y es peor 🤦"
    ]

    let frases = base.map(f => `De acá @${quien.split('@')[0]} ${f}`)

    // Reset si ya se usaron todas
    if(used.frases.length >= frases.length) used.frases = []
    if(used.usuarios.length >= 15) used.usuarios = []

    // Elegir frase no repetida
    let disponibles = frases.filter((_, i) =>!used.frases.includes(i))
    let idx = Math.floor(Math.random() * disponibles.length)
    let fraseElegida = disponibles[idx]
    let fraseIndex = frases.indexOf(fraseElegida)
    used.frases.push(fraseIndex)

    // Evitar repetir usuario si no hay tag
    if(used.usuarios.includes(quien) && m.mentionedJid.length == 0) {
        let miembros = (await conn.groupMetadata(m.chat)).participants.map(v => v.id)
        let nuevos = miembros.filter(u =>!used.usuarios.includes(u) && u!= conn.user.jid)
        if(nuevos.length > 0) quien = nuevos[Math.floor(Math.random() * nuevos.length)]
        fraseElegida = `De acá @${quien.split('@')[0]} ${base[fraseIndex]}`
    }
    used.usuarios.push(quien)

    let img = 'https://files.evogb.win/rSpmEd.jpg'
    let caption = `🔥 *QUEMADITA DEL DÍA* 🔥\n\n${fraseElegida}\n\n> *For Three Bot*`

    await conn.sendMessage(m.chat, {
        image: { url: img },
        caption: caption,
        mentions: [quien]
    }, { quoted: m })

    await m.react('💥')
}

handler.help = ['quemadas @tag']
handler.tags = ['fun']
handler.command = /^(quemadas)$/i
handler.group = true

export default handler