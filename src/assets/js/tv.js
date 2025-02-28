const tvmap = {
    douyu : 'https://www.douyu.com/',
    bilibili : 'https://live.bilibili.com/',
    huya : 'https://www.huya.com/'
}

function getTVlink(type,id){
    return tvmap[type] + id
}

export default getTVlink