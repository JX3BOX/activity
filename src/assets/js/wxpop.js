function getWechatIframe(){
    let url = encodeURIComponent(encodeURIComponent(location.href))
    let redirect_uri = 'https://server.jx3box.com/oauth/wechat/callback' + '?skip=' + url
    return `<iframe class="m-rank-pop-wechat" src="https://open.weixin.qq.com/connect/qrconnect?appid=wx7804c72000d28202&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=jx3box#wechat_redirect"></iframe>
    <p class="m-rank-pop-wechat-tips"><i class="el-icon-warning-outline"></i> 如绑定后仍提示绑定界面请重新登录</p>`
}

export default getWechatIframe