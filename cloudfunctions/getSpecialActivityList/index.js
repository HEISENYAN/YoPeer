// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const activityInfo = await db.collection("yopeerSpecialActivity").get({})
  var specialActivityList = []
  for(let i in activityInfo.data){
    const {activityName,imageUrl,introduction,place,activityDate,activity_id} = activityInfo.data[i]
    specialActivityList.push({activityName,imageUrl,introduction,place,activityDate,activity_id})
  }
  return specialActivityList
}