// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database() //调用数据库
var productInfo = ''
  
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("run")
  //{productID, }asdfasdf
  
  return db.collection('yopeerProduct').get({
    success:function(res){
      productInfo = res
      console.log(res)
    },
    fail:function(res){
      console.log(res)
    }
  })

  /*
  return {
    event,
    productInfo,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/
}