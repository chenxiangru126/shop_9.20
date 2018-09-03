const copyright = [{
    path: '/copy_right',
    name: 'copy_right',
    meta: {
        title: "订单详情"
    },
    components: {
        default: resolve => require(['../../components/shen_wan/shen_wan.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
    },{
        path: '/zheng_detail',
        name: 'zheng_detail',
        meta: {
            title: "版权证书"
        },
        components: {
            default: resolve => require(['../../components/zheng_detail/zheng_detail.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        },
}]
export default copyright;