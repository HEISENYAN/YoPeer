// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {activityID,nickName,avatarUrl,phoneNumber,tradeNumber,timeStamp,paidPrice} = event
  const activityInfo = await db.collection("yopeerActivityInventory").doc(activityID).get()
  activityInfo.data.participantInfo.push({
    openid:wxContext.OPENID,
    avatarUrl:avatarUrl,
    nickName:nickName,
    wechatID:"暂无",
    phoneNumber:phoneNumber
  })
  await db.collection("yopeerActivityInventory").doc(activityID).update({
    data:{
      participantInfo:activityInfo.data.participantInfo,
      registeredNum:activityInfo.data.registeredNum + 1
    }
  })
  await db.collection("yopeerActivityOrder").add({
    data:{
      _openid:wxContext.OPENID,
      activityID:activityID,
      avatarUrl:avatarUrl,
      nickName:nickName,
      wechatID:"暂无",
      phoneNumber:phoneNumber,
      tradeNumber:tradeNumber,
      orderTime:new Date(parseInt(timeStamp)*1000),
      paidPrice:paidPrice
    }
  })
}