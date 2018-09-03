// 错误相关
const cuowu = [{
    path: '/404',
    name: '404',
    meta: {
        title: "个人中心"
    },
    components: {
        default: resolve => require(['../../components/teshu/404.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},{
    path: '/nowifi',
    name: 'nowifi',
    meta: {
        title: "个人中心"
    },
    components: {
        default: resolve => require(['../../components/teshu/noWifi.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},
{
    path: '/nodata',
    name: 'nodata',
    meta: {
        title: "个人中心"
    },
    components: {
        default: resolve => require(['../../components/teshu/noData.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
}]
export default cuowu;