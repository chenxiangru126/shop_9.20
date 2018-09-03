// 地址管理
const receive_address = [{
    path: '/address_list',
    name: 'address_list',
    meta: {
        title: "收货地址"
    },
    components: {
        default: resolve => require(['../../components/receive-address/address_list.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    },
    children:[
        {
            path: '/add_address',
            name: 'add_address',
            meta: {
                title: "收件人地址"
            },
            components: {
                default: resolve => require(['../../components/receive-address/add_address.vue'], resolve),
                headers: resolve => require(['../../components/common/header.vue'], resolve)
            }
        }
    ]
}
]

export default receive_address;