// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {phoneNumber, avatarUrl, nickName, school, isRegistered} = event
  await db.collection('yopeerUser').doc(wxContext.OPENID).update({
    data:{
      phoneNumber:phoneNumber,
      avatarUrl:avatarUrl,
      nickName:nickName,
      _openid:wxContext.OPENID,
      school: school,
      isRegistered: isRegistered
    }
  })
  return context
}