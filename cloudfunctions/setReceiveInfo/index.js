// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('yopeerReceiveInfo').doc(wxContext.OPENID).set({
    data:{
        _openid:wxContext.OPENID,
        Name:event.receiveName,
        phoneNumber:event.receivePhoneNumber,
        address:event.receiveAddress,
        ifHallResident:event.ifHallResident
    }
  })
  return "success"
}