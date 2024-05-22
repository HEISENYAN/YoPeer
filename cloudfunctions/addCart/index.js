// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext.OPENID)
  const {prodID, prodNum} = event
  db.collection('yopeerCart').add({
    data:{
      prodID:prodID,
      prodNum:prodNum,
      _openid:wxContext.OPENID
    },
    success:function(){
      return "sucess"
    },
    fail:function(){
      return "fail"
    }
  })
}