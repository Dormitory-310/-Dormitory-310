import { regTest, getUrlParams, getCookie } from './utils'

const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

/**
 * 所适配的各种终端 (name 要与 '/src/callers/**' 保持一致)
 * 该终端指的是调起时候的执行环境，而不是需要调起的app
 * 其余终端统一当做browser处理
 * */
export const platformTypes = [
  {
    // 卖家版、采货侠、一格app都走zzLike的适配器，它们都是只需要拉起转转
    reg: /(zhuanzhuanseller)|(zzhunter)|(yigeapp)/g,
    name: 'zzLike',
  },
  {
    reg: /58zhuanzhuan/g,
    name: 'zz',
  },
  {
    reg: /micromessenger/g,
    name: 'wechat',
  },
  {
    reg: /qq/g,
    name: 'qq',
  },
]

// 目标app名称对应的协议名称
export const targetToSchema = {
  zz: 'zhuanzhuan:',
  zzseller: 'zhuanzhuanseller:',
  check: 'zzcheck:',
  yige: 'zzyige:',
}

// 转转各版本下载地址
export const downloadUrl = (function () {
  const iosUrl =
    'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1002355194?l=zh&ls=1&mt=8'
  const androidUrl = 'market://search?q=pname:com.wuba.zhuanzhuan'
  const wechatAndroid =
    'https://sj.qq.com/myapp/detail.htm?apkName=com.wuba.zhuanzhuan'
  return {
    ios: iosUrl,
    android: androidUrl,
    wechat_android: wechatAndroid,
    browser: 'https://app.zhuanzhuan.com/zz/redirect/download',
  }
})()

// 切克各版本下载地址
export const checkDownloadUrl = (function () {
  const iosUrl = 'itms-apps://itunes.apple.com/cn/app/id1457304322?mt=8'
  const androidUrl =
    'https://app.zhuanzhuan.com/zzopredirect/zzgbaselogic/download'
  return {
    browser: isAndroid ? androidUrl : iosUrl,
  }
})()

// 一格各版本下载地址
export const yigeDownloadUrl = (function () {
  const iosUrl =
    'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1524602621?l=zh&ls=1&mt=8'
  const androidUrl = 'market://search?q=pname:com.zhuanzhuan.yige'
  const wechatAndroid =
    'https://sj.qq.com/myapp/detail.htm?apkName=com.zhuanzhuan.yige'
  return {
    ios: iosUrl,
    android: androidUrl,
    wechat_android: wechatAndroid,
    browser: 'https://app.zhuanzhuan.com/zzopredirect/tobtoollogic/download',
  }
})()

/**
 * 设备平台
 * */
export const device = {
  isAndroid: regTest({
    reg: /android/g,
    str: navigator.userAgent.toLowerCase(),
  }),
  isIOS: regTest({ reg: /iphone/g, str: navigator.userAgent.toLowerCase() }),
  getType() {
    return (this.isAndroid && 'android') || 'ios'
  },
}

/**
 * 页面域名
 * */
export const domain = {
  is58Domain: regTest({
    reg: /\.58\.com/g,
    str: location.origin.toLowerCase(),
  }),
  isZZDomain: regTest({
    reg: /\.zhuanzhuan\.com/g,
    str: location.origin.toLowerCase(),
  }),
}

/**
 * 授权的公众号id
 * */
const getWxPublicId = () => {
  const query = getUrlParams()
  const config = Object.assign({}, window.nativeAdapterConfig)
  return (
    query.wxPublicId ||
    config.wxPublicId ||
    query.__t ||
    getCookie('zz_t') ||
    getCookie('t') ||
    '24'
  )
}

/**
 * 第三方依赖, 外链js
 * */
export const dependencies = {
  ZZ_LIKE_SDK: plat => {
    const urls = {
      zzseller: 'https://s1.zhuanstatic.com/common/zzapp/static/js/v1.0.14/zzseller-jssdk.min.js',
      zzhunter: 'https://s1.zhuanstatic.com/common/hunterapp/static/js/1.1.1/index.min.js',
      yige: 'https://s1.zhuanstatic.com/common/yigeapp/static/js/1.0.0/index.min.js'
    }
    return urls[plat];
  },
  ZZ_SDK:
    'https://s1.zhuanstatic.com/common/zzapp/static/js/1.14.0/zzapp.min.js',
  WB_SDK: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=670',
  WX_JWEIXIN: 'https://s1.zhuanstatic.com/common/jweixin-1.6.0.js',
  WX_WIKI: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
  WX_JSTICKET:
    `https://app.zhuanzhuan.com/zzopen/wxcommon/getJsTicket?wxPublicId=${getWxPublicId()}&url=` +
    encodeURIComponent(window.location.href.split('#')[0]) +
    '&callback=__json_jsticket',
}

/**
 * 转转App, native相关信息
 * */
export const AppInfomation = {
  SCHEMA: 'zhuanzhuan://', // 转转App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan', // Android客户端包名
  ANDROID_MAINCLS:
    '', // Android客户端启动页主类名
}

/**
 * 转转微信公众号相关信息
 * */
export const wechatInfomation = {
  appID: '', //转转app在微信绑定的appid
}

/**
 * 跳转协议映射, 老的openType对应统跳的映射表
 * */
export const SchemaMap = {
  home: {
    name: 'home',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=0',
    params: {},
  },
  messagecenter: {
    name: 'messagecenter',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=2',
    params: {},
  },
  mybuy: {
    name: 'mybuy',
    path: 'zhuanzhuan://jump/core/myBuyList/jump?tab=price',
    params: {},
  },
  publish: {
    name: 'publish',
    path: 'zhuanzhuan://jump/core/publish/jump',
    params: {},
  },
  detail: {
    name: 'detail',
    path: 'zhuanzhuan://jump/core/infoDetail/jump',
    params: {
      id: 'infoId',
    },
  },
  mysell: {
    name: 'mysell',
    path: 'zhuanzhuan://jump/core/mySellList/jump?tab=price',
    params: {},
  },
  order: {
    name: 'order',
    path: 'huanzhuan://jump/core/orderDetail/jump',
    params: {
      id: 'orderId',
    },
  },
  person: {
    name: 'person',
    path: 'zhuanzhuan://jump/core/personHome/jump',
    params: {
      id: 'uid',
    },
  },
  village: {
    name: 'village',
    path: 'zhuanzhuan://jump/core/village/jump',
    params: {
      id: 'villageId',
    },
  },
  web: {
    name: 'web',
    path: 'zhuanzhuan://jump/core/web/jump',
    params: {
      id: 'url',
    },
  },
}
