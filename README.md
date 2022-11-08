# 10分鐘 100行 LINE菜單機器人

每天中午要糾團吃午餐的時候, 都要從相簿找菜單, 然後貼到群組, 有夠累
有機器人以後, 就可以把常用菜單都傳到網路上, 直接打店名, 機器人就會幫忙貼菜單了!
想定飲料的時候, 可以讓機器人po出定飲料的網址, 而不是只能傳圖片菜單

感謝jcshawn製作的教學
https://github.com/jschang19/plusone-linebot

## 功能 Features

- 使用Google試算表做免費資料庫，簡單快速好用
- 程式只有100行 方便延伸應用
- 使用 Google App Script搭建免費Server

## 測試畫面
這是糾團群組截圖，只要有打店名關鍵字, ex:麥當勞 ，機器人會自動從google表單搜尋, 然後回傳菜單
<img src ="https://upload.cc/i1/2022/11/08/v7hjew.png">

<img src ="https://upload.cc/i1/2022/11/08/02esmU.png">

資料都是存在 Google 試算表裡, 方便直接更改, 不用另外學資料庫的使用：

## DEMO
可以使用我的範例機器人來試試看成果
1. LINE加入機器人 @645qrqax
2. 菜單圖片上傳到https://upload.cc , 然後將URL複製下來
3. 連到google表單新增關鍵字跟URL: https://docs.google.com/spreadsheets/d/1GOt-69ccP-RwVcgR7Y4tuZvBZvFOzNDzZgLCLv1lSIg/edit#gid=0
4. 跟機器人講話

## 自行架設的方法
1. 到https://developers.line.biz/zh-hant/ ,先註冊一個LINE Bot

Creat Provider -> 取一個BOT name
<img src ="https://upload.cc/i1/2022/11/08/aXZpYt.png">

Channel -> "Creat a Messaging API Channel"
<img src ="https://upload.cc/i1/2022/11/08/OW7snA.png">

該填入的資訊填一填, 可以換個BOT頭貼
<img src ="https://upload.cc/i1/2022/11/08/pre97g.png">

這樣就建好一個LineBot了
<img src ="https://upload.cc/i1/2022/11/08/6avoux.png">

2.
進入"Messaging API"
<img src ="https://upload.cc/i1/2022/11/08/gMwlTy.png">

點Edit進入
<img src ="https://upload.cc/i1/2022/11/08/ldoWF8.png">

把 Allow bot to join group chats 改 "Enable"
把 Auto-reply messages 改 "Disable"
<img src ="https://upload.cc/i1/2022/11/08/2C3Vmj.png">
<img src ="https://upload.cc/i1/2022/11/08/DkmFCN.png">

3. 
點下 Issue, 從這裡取得 LINE API Token
ex: 
Q+nAAAA5A5shRBj/fHrRoaEsOzz96GjlZSmm44lhdat+SUQ57Qrx6eO9+KwDgBXyPM6Y9ycgUiIdJMkgiBmHmtjZh/RkxLvQkHd9+eT6GpV+xu6gPOpn6Bd3ZzXBczxOeDKxFE4oLkkYM7gDLrszxQdB04t89/1O/w1cDAAAcsw=

<img src ="https://upload.cc/i1/2022/11/08/t1Gd97.png">

4.
進入Google雲端硬碟: https://drive.google.com/drive/my-drive
新增一個試算表
並且右上角的"共用"按鈕, 將權限改成如下圖
<img src ="https://upload.cc/i1/2022/11/08/wHSPs3.png">

把URL複製下來, 等下使用
ex:
https://docs.google.com/spreadsheets/d/1GOt-69ccP-RwVcgR7Y4tuZvBZvFOzNDzZgLCLv1lSIg/edit#gid=0

A欄位為關鍵字 B欄位為URL C欄位用來放圖片的判斷:1為圖 0為String
EX:
麥當勞	https://upload.cc/i1/2020/11/05/HvXgSE.png	1
定飲料	https://docs.google.com/spreadsheets/d/1CAcF7zyTUFYkqnd7dkkfmwofDjQaw_J9cxmfJmK0sgE/edit?usp=sharing	0

5.
進入Google雲端硬碟: https://drive.google.com/drive/my-drive
新增一個 "Google Apps Scripts"文件
<img src ="https://upload.cc/i1/2022/11/08/Z10pdw.png">

專案名稱可以改名
<img src ="https://upload.cc/i1/2022/11/08/C80oQi.png">

將 menubot.js 的內容複製，貼到右邊編輯的區域,
<img src ="https://upload.cc/i1/2022/11/08/cN0daV.png">

修改變數
CHANNEL_ACCESS_TOKEN //第12行 改上面拿到的LINE API Token
const sheet_url //第32行 改上面拿到的google試算表URL
const sheet_name = 'data'; //第33行 google試算表 工作表1的名字
<img src ="https://upload.cc/i1/2022/11/08/oVSsTu.png">

6.
右上角 部屬->新增部屬作業
<img src ="https://upload.cc/i1/2022/11/08/cN0daV.png">

點選設定按鈕-> "網路應用程式"
<img src ="https://upload.cc/i1/2022/11/08/nVDP72.png">

權限改"所有人", 說明隨便打, 然後點"部屬"
<img src ="https://upload.cc/i1/2022/11/08/ERNBOs.png">

點"授予存取權", 然後登入google帳號
選最下面 Unsafe連結 -> 下個畫面再點"Allow"
<img src ="https://upload.cc/i1/2022/11/08/5faroW.png">

最後得到URL, 將其複製下來, 這是等下要填到LINE BOT的Webhook URL資料
<img src ="https://upload.cc/i1/2022/11/08/GwqJ2F.png">

7.
再回到 https://developers.line.biz/zh-hant/ 
把剛剛得到的URL填入
<img src ="https://upload.cc/i1/2022/11/08/ykRPn8.png">

"Use webhook" 打開
<img src ="https://upload.cc/i1/2022/11/08/cZwMa4.png">
這樣就設定完了!!

8.
測試, 透過網頁上的 bot id 來把機器人加入好友
<img src ="https://upload.cc/i1/2022/11/08/N8inEt.png">
<img src ="https://upload.cc/i1/2022/11/08/maMJhF.png">

跟機器人講話 ex:麥當勞
看到回應菜單就成功了
<img src ="https://upload.cc/i1/2022/11/08/v7hjew.png">

回傳URL測試, ex:訂飲料
大家就可以直接上該表單去填寫要喝什麼飲料
<img src ="https://upload.cc/i1/2022/11/08/02esmU.png">

menu -h 會跳出資料庫URL, 方便新增加菜單
<img src ="https://upload.cc/i1/2022/11/08/AOlFkI.png">

## 參考資料
- [做個 LINE 機器人記錄誰 +1！群組 LINE Bot 製作教學與分享](https://jcshawn.com/addone-linebot/)
- [GitHub Code](https://github.com/jschang19/plusone-linebot)

## License
MIT License
感謝jcshawn製作的教學

