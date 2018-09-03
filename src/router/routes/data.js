// 钱包相关
const data = [{
    path: '/geren_data',
    name: 'geren_data',
    meta: {
        title: "网店资料"
    },
    components: {
        default: resolve => require(['../../components/dataBank/geren_data.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
}, {
    path: '/qiye_data',
    name: 'qiye_data',
    meta: {
        title: "网店资料"
    },
    components: {
        default: resolve => require(['../../components/dataBank/qiye_data.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},{
    path: '/detailData',
    name: 'detailData',
    meta: {
        title: ""
    },
    components: {
        default: resolve => require(['../../components/dataBank/detailData.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
       
       
    }
},{
    path: '/switch',
    name: 'switch',
    meta: {
        title: "我的网店"
    },
    components: {
        default: resolve => require(['../../components/dataBank/switch.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    
       
}}
]
export default data;