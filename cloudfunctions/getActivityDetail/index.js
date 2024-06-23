// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const{activityID} = event
  const activityInfo = await db.collection("yopeerActivityInventory").doc(activityID).get()
  const {quota,activityBackendID,activityIntroductionUrl,activityName,deadline,price,topImageUrl,hostDate} = activityInfo.data
  const participantInfo = await db.collection("yopeerActivityBackend").doc(activityBackendID).get()
  var avatarUrlList = []
  for(let i in participantInfo.data.participantInfo){
    avatarUrlList.push(participantInfo.data.participantInfo[i].avatarUrl)
  }
  const registeredPerson = participantInfo.data.registeredPerson
  return {activityIntroductionUrl,activityName,deadline,price,topImageUrl,hostDate,quota,registeredPerson,avatarUrlList}
}