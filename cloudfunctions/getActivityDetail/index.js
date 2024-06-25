// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const{activityID} = event
  const activityInfo = await db.collection("yopeerActivityInventory").doc(activityID).get()
  const {quota,participantInfo,activityIntroductionUrl,activityName,deadline,price,topImageUrl,hostDate,registeredNum,place} = activityInfo.data
  const wxContext = cloud.getWXContext()
  const _openid = wxContext.OPENID
  var avatarUrlList = []
  var participantOpenIDList = []
  for(let i in participantInfo){
    avatarUrlList.push(participantInfo[i].avatarUrl)
    participantOpenIDList.push(participantInfo[i].openid)
  }
  return {activityIntroductionUrl,activityName,deadline,price,topImageUrl,hostDate,quota,registeredNum,avatarUrlList,participantOpenIDList,_openid,place}
}