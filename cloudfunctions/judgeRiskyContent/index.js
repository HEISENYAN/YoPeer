// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {content,scene} = event
  const result = await cloud.openapi.security.msgSecCheck({
    "content": content,
    "version":2,
    "scene": scene,
    "openid":wxContext.OPENID
  })
  return result
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}