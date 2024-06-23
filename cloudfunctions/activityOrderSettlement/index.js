// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {activityID,nickName,avatarUrl,phoneNumber,tradeNumber,timeStamp,paidPrice} = event
  const activityInfo = await db.collection("yopeerActivityInventory").doc(activityID).get()
  var activityBackendInfo = await db.collection("yopeerActivityBackend").doc(activityInfo.data.activityBackendID).get()
  activityBackendInfo.data.participantInfo.push({
    _openID:wxContext.OPENID,
    avatarUrl:avatarUrl,
    nickName:nickName,
    wechatID:"暂无",
    phoneNumber:phoneNumber
  })
  await db.collection("yopeerActivityBackend").doc(activityInfo.data.activityBackendID).update({
    data:{
      participantInfo:activityBackendInfo.data.participantInfo,
      registeredPerson:activityBackendInfo.data.registeredPerson + 1
    }
  })
  await db.collection("yopeerActivityOrder").add({
    data:{
      _openid:wxContext.OPENID,
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