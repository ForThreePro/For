let handler = async (m, { conn }) => {

  if (!global.dadoVotes) global.dadoVotes = {}
  let chatId = m.chat

  if (global.dadoVotes[chatId]) return m.reply('Ya hay un dado en curso 🎲 Espera a que termine')

  // [1. MANDA ENCUESTA]
  let pollMsg = await conn.sendPoll(m.chat,
    '🎲 *TIRANDO EL DADO...*\nVota rápido! 10 segundos\n*Solo puedes votar 1 vez*',
    ['1', '2', '3', '4', '5', '6'],
    { quoted: m, selectableCount: 1 }
  )

  global.dadoVotes[chatId] = { votado: false, pollId: pollMsg.key.id, quien: null }

  await m.reply('⏳ *10 segundos* para votar...')

  // [2. LISTENER: AL PRIMER VOTO LO BLOQUEA]
  const voteHandler = async (update) => {
    if (!global.dadoVotes[chatId]) return
    if (update.pollUpdates) {
      for (let poll of update.pollUpdates) {
        if (poll.pollId === pollMsg.key.id && poll.voters && poll.voters.length > 0 &&!global.dadoVotes[chatId].votado) {
          global.dadoVotes[chatId].votado = true
          global.dadoVotes[chatId].quien = poll.voters[0]

          await conn.reply(m.chat, `✅ @${poll.voters[0].split('@')[0]} ya votó. Ya no se puede cambiar.`, m, { mentions: [poll.voters[0]] })
          conn.ev.off('pollUpdate', voteHandler)
        }
      }
    }
  }
  conn.ev.on('pollUpdate', voteHandler)

  // [3. TIMEOUT DE 10 SEG]
  setTimeout(async () => {
    if(global.dadoVotes[chatId]) {
      if(!global.dadoVotes[chatId].votado) await conn.reply(m.chat, '⏰ Tiempo acabado. Nadie votó.', m)
      conn.ev.off('pollUpdate', voteHandler)
      delete global.dadoVotes[chatId]
    }
  }, 10000) // 10 segundos

  // [4. ESPERAR 10 SEG Y TIRAR DADO]
  await new Promise(resolve => setTimeout(resolve, 10000))
  if(!global.dadoVotes[chatId]) return

  let numero = Math.floor(Math.random() * 6) + 1
  await conn.sendMessage(m.chat, { react: { text: '🎲', key: m.key } })

  let texto = `🎲 *RESULTADO* 🎲\n\nSalió el: *${numero}*`
  if (numero === 6) texto += '\n\n🔥 *CRÍTICO!*'
  if (numero === 1) texto += '\n\n💀 *F*'

  if(global.dadoVotes[chatId]?.quien) {
    texto += `\n\nVotó: @${global.dadoVotes[chatId].quien.split('@')[0]}`
  }

  await conn.reply(m.chat, texto, m, { mentions: global.dadoVotes[chatId]?.quien? [global.dadoVotes[chatId].quien] : [] })
  delete global.dadoVotes[chatId]
}

handler.help = ['dado']
handler.tags = ['diversion']
handler.command = /^(dado|dice|roll)$/i
handler.group = true
export default handler