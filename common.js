const axios = require('axios')
const qs = require('querystring')
const SERVER_J = require('./config').SERVER_J

function getTime(type) {
  const time = new Date()
  const month = time.getMonth() > 8 ? time.getMonth()+1 : "0"+ (time.getMonth()+1)
  const day = time.getDate() > 8 ? time.getDate() : "0"+ time.getDate()
  switch (type) {
    case 1:
      return `${month}月${day}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    case 2:
      return `${"" + time.getFullYear() + month + day}`
    case 3:
      return `${"" + time.getFullYear() + "-" + month+ "-" + day}`
  }
}

function formatResult(taskName, taskInfo) {
  return `任务：【${taskName}】已启动，${typeof taskInfo === 'string' ? taskInfo : JSON.stringify(taskInfo) }`
}

function sendNotify (text,desp) {

  if (!SERVER_J) return console.log("缺少 Server 酱 Token！")

  const url = `https://sc.ftqq.com/${SERVER_J}.send`
  const data = qs.stringify({ text, desp })

  axios.post(url, data).then(res=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}

class Msg {
  static msgList = [];

  static push(info) {
    Msg.msgList.push(info)
  }

  static getMsg() {
    return Msg.msgList.join('\n\n')
  }
}

class TitleMsg {
  static msgList = [];

  static push(info) {
    Msg.msgList.push(info)
  }

  static getMsg() {
    return Msg.msgList.join(', ')
  }
}


module.exports = {
  getTime,
  formatResult,
  sendNotify,
  Msg,
  TitleMsg,
}
