// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userInfo =  await db.collection('yopeerUser').where({
    _openid : wxContext.OPENID
  }).get({})
  //if(userInfo[0] == null) return "empty"
  //console.log(userInfo)
  console.log(userInfo)
  if(userInfo.data.length != 0) return userInfo.data[0]
  const defaultNumber = Math.round((Math.random() * 20)) % 3 + 1
  await db.collection('yopeerUser').doc(wxContext.OPENID).set({
    data:{
      phoneNumber:'+86 电话',
      _openid: wxContext.OPENID,
      avatarUrl:"cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/yopeer-user-avatar/default-avatar"+defaultNumber+".jpg",
      yoPeerValue:0,
      nickName:"小鱼饼",
      schoolIndex:0,
      school:"未知学校",
      isRegistered: false,
      wechatID: "",
      isVoucher:false
    }
  })
  const userInfo2 = await db.collection('yopeerUser').doc(wxContext.OPENID).get()
  return userInfo2.data
}