export async function before(m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return true

    let who = m.messageStubParameters[0] + '@s.whatsapp.net' // La víctima / El afectado
    let actor = m.key.participant || m.participant // El admin que hizo la acción
    let chat = m.chat
    let user = who.split('@')[0]
    let admin = actor.split('@')[0]

    try {
        switch (m.messageStubType) {

        // 25 = PROMOTE = Le dieron admin a alguien
        case 25: 
            await conn.reply(chat, `👑 @${admin} le dio *ADMIN* a @${user}\nNo abuses del poder oe 😂`, m, { mentions: [actor, who] })
            break

        // 26 = DEMOTE = Le quitaron admin a alguien
        case 26: 
            await conn.reply(chat, `💀 @${admin} le quitó *ADMIN* a @${user}\nF, bajaste de rango`, m, { mentions: [actor, who] })
            break

        // 21 = SUBJECT = Cambiaron el nombre del grupo
        case 21: 
            let tema = m.messageStubParameters[0]
            await conn.reply(chat, `📢 @${admin} cambió el nombre del grupo\nNuevo nombre: *${tema}*`, m, { mentions: [actor] })
            break

        // 22 = ICON = Cambiaron la foto del grupo
        case 22: 
            await conn.reply(chat, `🖼️ @${admin} cambió la foto del grupo\nQuedó god el nuevo icono`, m, { mentions: [actor] })
            break
        }

    } catch (e) {
        console.log('Error en _detect:', e)
    }
}