/*
* 作者 : Jason Huang
* 程式名稱 : LINE菜單機器人
* 簡述 : 透過店名來讓機器人發出菜單,不用每天糾團都在找菜單，將資料存放在 Google Sheet 中，基於 App Script 語法
* 授權: MIT License
* 聯絡方式: craig7351@gmail.com
* 最新更新 : 2022 / 11 / 7
*/

function doPost(e) {
    // LINE Messenging API Token
    var CHANNEL_ACCESS_TOKEN = 'Q+nATXr5A5shRBj/fHrRoaEsOzz96GjlZSmm44lhdat+SUQ57Qrx6eO9+KwDgBXyPM6Y9ycgUiIdJMkgiBmHmtjZh/RkxLvQkHd9+eT6GpV+xu6gPOpn6Bd3ZzXBczxOeDKxFE4oLkkYM7gDLrszxQdB04t89/1O/w1cDnyilFU=';
	
    // 以 JSON 格式解析 User 端傳來的 e 資料
    var msg = JSON.parse(e.postData.contents);
    
    /* 
    * LINE API JSON 解析資訊
    *
    * replyToken : 一次性回覆 token
    * userMessage : 使用者訊息，用於判斷是否為關鍵字
    */
    const replyToken = msg.events[0].replyToken;
    const userMessage = msg.events[0].message.text;

    /*
    * Google Sheet 資料表資訊設定
    *
    * 將 sheet_url 改成你的 Google sheet 網址
    * 將 sheet_name 改成你的工作表名稱
    */    
    const sheet_url = 'https://docs.google.com/spreadsheets/d/17pi4KtDv-oHUq7yc9g2zYnyQ0a6yPTR6iDpPEnWYkvc/edit#gid=0';
    const sheet_name = 'data';
    const SpreadSheet = SpreadsheetApp.openByUrl(sheet_url);
    const reserve_list = SpreadSheet.getSheetByName(sheet_name);

    // 必要參數宣告
    var current_list_row = reserve_list.getLastRow(); // 取得工作表最後一欄（ 直欄數 ）
    var reply_message = []; // 空白回覆訊息陣列，後期會加入 JSON

    // 回傳訊息給line 並傳送給使用者
    function send_to_line() {
        var url = 'https://api.line.me/v2/bot/message/reply';
        UrlFetchApp.fetch(url, {
            'headers': {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
                'replyToken': replyToken,
                'messages': reply_message,
            }),
        });
    }

    if (typeof replyToken === 'undefined') {
        return;
    };

    if (userMessage == "menu -h") {
      reply_message = [
      {
          "type": "text",
          "text": "資料請自己手動加✋"
      },
      {
          "type": "text",
          "text": "https://docs.google.com/spreadsheets/d/17pi4KtDv-oHUq7yc9g2zYnyQ0a6yPTR6iDpPEnWYkvc/edit#gid=0"
      }]
      send_to_line();
    }
    else {
        var key = reserve_list.getRange(1, 1, current_list_row, 1).getValues().flat(); //A欄放關鍵字
        var key_data = reserve_list.getRange(1, 2, current_list_row, 1).getValues().flat(); //B欄放URL
        var type = reserve_list.getRange(1, 3, current_list_row, 1).getValues().flat(); //C欄用來讓BOT知道回傳的值是圖片or text
        var get_service = key.indexOf(userMessage);

        if (get_service != -1) { //表示A欄有找到對應關鍵字,才會進來, get_service回傳找到的index
          if (type[get_service] == "1") // C欄位為1 表示為圖片
          {
            reply_message = [
            {
              "type": "image",
              "originalContentUrl": key_data[get_service],
              "previewImageUrl": key_data[get_service],
              "animated": true
            }]
          }
          else //URL data
          {
            reply_message = [
            {
              "type": "text",
              "text": key_data[get_service]
            }]
          }
          send_to_line();
        }
        else
        {
		  //other message , not reply
        }
    }
}