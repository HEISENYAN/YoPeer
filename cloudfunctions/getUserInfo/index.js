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
  await db.collection('yopeerUser').doc(wxContext.OPENID).set({
    data:{
      phoneNumber:'',
      _openid: wxContext.OPENID,
      avatarUrl:"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      yoPeerValue:0,
      nickName:"游客",
      schoolIndex:0,
      school:"未知学校",
      isRegistered: false,

    }
  })
  const userInfo2 = await db.collection('yopeerUser').doc(wxContext.OPENID).get()
  return userInfo2.data
}