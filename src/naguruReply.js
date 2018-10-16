import axios from 'axios'

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body)
  const targetEvent = body.events[0]

  const data = {
    replyToken: targetEvent.replyToken,
    messages: [
      {
        type: 'text',
        text: '殴るぞ',

      }
    ]
  }

  await axios.post('https://api.line.me/v2/bot/message/reply', data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CHANNEL_TOKEN}`
    }
  })

  callback(null, {})
}