import CallApp from '../src'

const btn2 = document.getElementById('btn')
const callApp = (window.callApp = new CallApp())
btn2.addEventListener('click', function () {
  callApp.start({
    path: 'https://m.client.10010.com/mobileService/openPlatform/openPlatLinePro.htm?to_url=https://u.10010.cn/tbL86?yw_code=&desmobile=15555305685&version=android@8.0002', // 兼容app所有统跳地址
    channelId: '777',
    targetApp: 'chinaunicom',
    wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
    universal: true,
  })
})
