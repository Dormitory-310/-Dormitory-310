export default class ZZSellerApp {
  constructor(app) {
    this.App = app
  }

  /**
   *  @description 打开调起第三方App (目前转转主App内，只允许打开商家App，zzv >= 5.10)
   *  @param {Object} options -必填项，以json形式传参
   *  @param {String} options.unifiedUrl - 必填项，商家版统跳协议
   *  @param {String} options.needClose - 选填项，是否关闭当前页 ( 1: 关闭当前页面 , 0 不关闭)
   *  @return {Promise}
   * */
  openApp(options) {
    return this.App.enterUnifiedUrl(options)
  }

  /**
   *  @description 获取58app当前版本
   *  @return {String}
   * */
  getVersion() {
    return this.App.version
  }
}
