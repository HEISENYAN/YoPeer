// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {paidPrice, totalPrice, isDiscount,expectedDate, timeStamp, tradeNumber, productInfo} = event
  const receiveInfo = await db.collection("yopeerReceiveInfo").doc(wxContext.OPENID).get()
  //let orderTime = new Date(timeStamp)
  await db.collection("yopeerOrder").add({
    data:{
      _openid:wxContext.OPENID,
      receiveInfo:receiveInfo.data,
      expectedDate:expectedDate,
      orderTime: new Date(parseInt(timeStamp)*1000),
      tradeNumber:tradeNumber,
      productInfo:productInfo,
      totalPrice:totalPrice,
      paidPrice:paidPrice,
      isDiscount:isDiscount
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}