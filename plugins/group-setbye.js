const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply('❌ ¡Solo los administradores o el dueño pueden usar estos comandos!');
    }

    let chat = global.db.data.chats[m.chat]??= {}

    if (command === 'setbye') {
        if (!text) return m.reply('❌ Por favor, proporciona un mensaje.\n*Placeholders:* `@user` `@group` `@count` `@desc`\n\n*Ejemplo:* .setbye Chao @user');
        chat.customBye = text.trim();

        return m.reply(`✅ *Despedida personalizada establecida*\n\n\`\`${text.trim()}\`\n\nPara quitarla usa: .delbye`);

    } else if (command === 'delbye') {
        if (!chat.customBye) return m.reply('⚠️ No tienes una despedida editada.');
        delete chat.customBye;
        return m.reply('✅ *Listo*\n\nSe eliminó la despedida personalizada. Ahora se usa la de `welcome.js`.');
    }
};
handler.help = ['setbye <Mensaje>', 'delbye'];
handler.tags = ['group''];
handler.command = /^(setbye|delbye)$/i;
handler.admin = true;
handler.group = true;
export default handler;