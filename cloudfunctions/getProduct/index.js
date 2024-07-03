// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database() //调用数据库

  
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {product_id} = event;
  const productInfo =  await db.collection('yopeerInventory').doc(product_id).get({})
  const {prodName,introduction,introductionUrls,options,price,prodID,_id,thumbnailUrl,specifiedUrls} = productInfo.data
  return {prodName,introduction,introductionUrls,options,price,prodID,_id,thumbnailUrl,specifiedUrls}
  /*
  return {
    event,
    productInfo,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/
}