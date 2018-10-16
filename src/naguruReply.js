//CHANNEL_ACCESS_TOKENを設定
//LINE developerで登録をした、自分のCHANNEL_ACCESS_TOKENを入れて下さい

var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

//ポストで送られてくるので、ポストデータ取得
//JSONをパースする
function doPost(e) {
  var json = JSON.parse(e.postData.contents);

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
}