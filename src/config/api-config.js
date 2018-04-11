/*
 * 端口域名配置
 * @type Object
 */
var apiUrl = {
  baseNewUrl: 'https://dev407.33.cn',
    // baseNewUrl: 'https://test.33.cn',
    uploadUrl:"https://oss.33.cn",
    
    // baseNewUrl:"https://dev407.33.cn",

    // baseNewUrl:'https://dev407.33.cn'
}
export default {
/*
 *代理商接口
 *（新版）
 */
    // newRegist: apiUrl.baseNewUrl + '/api/member/brokerregister', //注册
    newRegist: apiUrl.baseNewUrl + '/api/broker/register', //注册

    sedMsssss:apiUrl.baseNewUrl + '/api/send/newsms',//短信

    sedEmmmmm:apiUrl.baseNewUrl + '/api/send/newmail',//邮件

    // newLogin: apiUrl.baseNewUrl + '/api/member/login',  //登录
    newLogin: apiUrl.baseNewUrl + '/api/broker/login',  //登录

    applyCountry: apiUrl.baseNewUrl+'/api/data/city',//获取省市接口

    applyToAgent: apiUrl.baseNewUrl+'/api/broker/apply',//申请成为经纪人

    applyStatus: apiUrl.baseNewUrl+'/api/broker/applystatus',//申请状态查询

    // resetEmailPassword: apiUrl.baseNewUrl+'/api/member/reset',//密码找回（邮件短信）发送
    resetEmailPassword: apiUrl.baseNewUrl+'/api/send/newreset',//密码找回（邮件短信）发送
/*
 *代理商接口
 *（老版）
 */
   userLogin:apiUrl.baseNewUrl+'/api/member/login',//用户登录

   userLoginUp:apiUrl.baseNewUrl+'/api/member/reg',//用户注册

   userAssetlist:apiUrl.baseNewUrl+'/api/Account/Asset',//用户资产列表

   userAssethist:apiUrl.baseNewUrl+'/api/Pay/CoinRecord',//我的资产历史记录

   usertradeList:apiUrl.baseNewUrl+'/api/data/market',////获取行情

   getcoindata:apiUrl.baseNewUrl+'/api/data/Ticker',//首页ticker数据

   sendEmail: apiUrl.baseNewUrl + '/api/send/mail', //发送邮件通知

   getUserInfo: apiUrl.baseNewUrl + "/api/member/info",//获取用户信息

   loginout: apiUrl.baseNewUrl + '/api/member/loginout',//账户退出

   Cancel: apiUrl.baseNewUrl+'/api/trade/cancel',//撤单接口

   hisorder: apiUrl.baseNewUrl + "/api/trade/OrderList",//交易历史

   place: apiUrl.baseNewUrl+'/api/trade/place',//交易接口

   changePassword: apiUrl.baseNewUrl+'/api/member/editpassword',//修改密码

   loginrecord: apiUrl.baseNewUrl+'/api/account/loginrecord',//登陆日志

   chargecoin: apiUrl.baseNewUrl+'/api/account/myaddress',//充币

   adressList: apiUrl.baseNewUrl+'/api/account/addresslist',//地址列表

   mancoinmon: apiUrl.baseNewUrl+'/api/data/fees',//提币手续费

   phoneCountry: apiUrl.baseNewUrl+'/api/data/country',//国家信息

   phoneCheckedNum: apiUrl.baseNewUrl+'/api/send/sms',//手机验证码

   phoneCommit:apiUrl.baseNewUrl+'/api/certification/mobile',//手机验证提交

   getState:apiUrl.baseNewUrl+'/api/certification/states',//验证状态

   emailCommit:apiUrl.baseNewUrl+'/api/certification/email',//邮件验证

   uploadImg:apiUrl.uploadUrl+'/upload/certificate',//上传图片

   getImgToken:apiUrl.baseNewUrl + "/api/certification/UploadToken",//获取图片上传token

   cardType:apiUrl.baseNewUrl + '/api/data/cardtypes', //获取证件类型

   ocr:apiUrl.baseNewUrl + '/api/Certification/Ocr', //证件OCR

   Certification: apiUrl.baseNewUrl + '/api/certification/identity', //提交认证信息

   resetPwd:apiUrl.baseNewUrl + '/api/member/resetpassword', //重置密码

   pwdSend:apiUrl.baseNewUrl + '/api/send/reset', // 密码找回（邮件短信）发送

   txFees:apiUrl.baseNewUrl + '/api/data/txfees',//提币手续费

   getFaceAmount:apiUrl.baseNewUrl + '/api/data/faceamount',//获取人脸额度

   getOutCin:apiUrl.baseNewUrl + '/api/pay/Withdrawcoin',//提币接口

   addAdress:apiUrl.baseNewUrl + '/Applications/account/ManageAdress',//新增地址

}
