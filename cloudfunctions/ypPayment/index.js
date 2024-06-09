// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "鱼饼优选-测试商品", // 商品描述
    "outTradeNo" : "123123123123123", // 商户订单号
    "spbillCreateIp" : "202.125.195.7", // 终端 IP
    "subMchId" : "1678748686", // 商户号
    "totalFee" : 1, // 总金额
    "envId": "yopeer-0g9zeq1439bcebc2", // 云函数环境名称
    "functionName": "pay_res" // 支付结果通知回调云函数名
  })
  console.log(res)
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}