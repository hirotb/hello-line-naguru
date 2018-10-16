import axios from 'axios'

exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body)
  const targetEvent = body.events[0]

//ポストで送られてくるので、ポストデータ取得
//JSONをパースする
  var json = JSON.parse(event.postData.contents);

  //返信するためのトークン取得
  var reply_token= json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたLINEメッセージを取得
  var user_message = json.events[0].message.text;

 /* //返信する内容を作成
  var reply_messages;
  var random = Math.floor( Math.random() *10 );
  if(random == 0) {
    reply_messages = ['腹パンね',];
  }
 else*/
 if ('こんにちわ' == user_message) {
    //かっこいいと入力された際
    reply_messages = ['殴るぞ',];

  } else if ('おはよう' == user_message) {
    //かわいいと入力された際
    reply_messages = ['てめぇふざけてんのか',];

  } else if ('おやすみ' == user_message) {
    //普通と入力された際
    reply_messages = ['おやすみ',];

  } else {
    //かっこいい、かわいい、普通が入力されたときの処理
    reply_messages = ['「こんにちわ」って挨拶しろ'];
  }

  // メッセージを返信
  var messages = reply_messages.map(function (v) {
    return {'type': 'text', 'text': v};
  });



 /* const data = {
    replyToken: targetEvent.replyToken,
    messages: [
      {
        type: 'text',
        text: '今日何食べたい？',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                label: '寿司',
                text: '寿司'
              }
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: '焼肉',
                text: '焼肉'
              }
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'とんかつ',
                text: 'とんかつ'
              }
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'ラーメン',
                text: 'ラーメン'
              }
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: '日本酒',
                text: '日本酒'
              }
            }
          ]
        }
      }
    ]
  }*/

/*
UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CHANNEL_TOKEN}`
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  */



  await axios.post('https://api.line.me/v2/bot/message/reply', data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CHANNEL_TOKEN}`
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
    }),
  })

  callback(null, {})
}