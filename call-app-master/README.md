**！！此项目为交流演示所用，请勿用于生产环境**

# 简介
`call-app` 是一个通用的唤起app的库

## 使用方法
参照 `demo/app.js` 中的使用方式

## 配置参数说明
- **path** `String` 调起app时，默认打开的页面，类型为app的统跳地址（选填）
- **channelId** `String` 渠道号，当用户没有安装app时，默认下载的渠道号，安卓支持，iOS不支持，默认`923`（选填）
- **targetApp** `String` 调起的目标app，其中：zz(转转),zzseller(转转卖家版),check(切克app),yige(一格app)，默认为`zz`
- **universal** `Boolean` 是否开启通用链接调起模式，默认为`false`
- **download** `Boolean` 是否会自动跳转下载页面，默认为 `true`
- **middleWareUrl** 中转url，如空则直接跳转下载安装包或appstore
- **urlSearch** `Object` [已废弃] 指定页面调起方式，不推荐，直接设置path来跳转即可
  - **openType** `String` 页面类型，可选值为 `home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面`
  - **id** `String` 存放id或者url，配合`openType` 的值来用
- **callback** `Function` 发起调起请求时的回调

## API
- **download** `Function` 独立的下载功能

```js
// 方法挂在CallApp类上，而非实例上
// opts配置同上
CallApp.download(opts)
```

## 兼容性

| 场景          | ios | 安卓 |
| ------------- | --- | ---- |
| 微信          | ✔️   | ✔️    |
| qq            | ✔️   | ✔️    |
| chrome        | ✔️   | ✔️    |
| 小米 browser  | ✔️   | ✔️    |
| uc            | ✔️   | ✔️    |
| qq browser    | ✔️   | ✔️    |
| 360 browser   | ✔️   | ✔️    |
| 猎豹          | ✔️   | ✔️    |
| sogou         | ✔️   | ✔️    |
| baidu browser | ✔️   | ✔️    |
| safari        | ✔️   | ✔️    |
| 微博          | X   | X    |
