// 钱包相关
const wallet = [{
    path: '/wallet',
    name: 'wallet',
    meta: {
        title: "我的钱包"
    },
    components: {
        default: resolve => require(['../../components/wallet/wallet.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    },
    children:[{
        path: '/tx_list',
        name: 'tx_list',
        meta: {
            title: "明细"
        },
        components: {
            default: resolve => require(['../../components/wallet/tx_list.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    }, {
        path: '/bill_details',
        name: 'bill_details',
        meta: {
            title: "退款账单详情"
        },
        components: {
            default: resolve => require(['../../components/wallet/bill_details.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
     {
        path: '/bill_details2',
        name: 'bill_details2',
        meta: {
            title: "平台账单详情"
        },
        components: {
            default: resolve => require(['../../components/wallet/bill_details2.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/tx_apply',
        name: 'tx_apply',
        meta: {
            title: "提现"
        },
        components: {
            default: resolve => require(['../../components/wallet/tx_apply.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/tx_end',
        name: 'tx_end',
        meta: {
            title: "提现"
        },
        components: {
            default: resolve => require(['../../components/wallet/tx_end.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/refund_end',
        name: 'refund_end',
        meta: {
            title: "退款"
        },
        components: {
            default: resolve => require(['../../components/wallet/refund_end.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    }]
}, {
    path: '/',
    name: '',
    meta: {
        title: "我的钱包"
    },
    components: {
        default: resolve => require(['../../components/wallet/wallet.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
}]

export default wallet;