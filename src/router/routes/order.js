// 订单相关
import receive_address from './recevie_address';
 const order=[
     //买家订单列表
    {
        path: '/order_list_buyer',
        name: 'order_list_buyer',
        meta: {
            title: "订单"
        },
        components: {
            default: resolve => require(['../../components/order/order_list_buyer.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        },
        children:[
            {
                path: 'order_search_buyer',
                name: 'order_search_buyer',
                meta: {
                    title: ""
                },
                component: resolve => require(['../../components/order/order_search_buyer.vue'], resolve)
            },
        ]
    },
      //卖家订单列表
      {
        path: '/order_list_seller',
        name: 'order_list_seller',
        meta: {
            title: "我的订单"
        },
        components: {
            default: resolve => require(['../../components/order/order_list_seller.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        },
        children:[
            {
                path: 'order_search_seller', name: 'order_search_seller',
               component: resolve => require(['../../components/order/order_search_seller.vue'], resolve),
                meta:{ title:"" }
            }
        ]
    },
     //买家订单详情
    {
        path: '/order_details_buyer',
        name: 'order_details_buyer',
        meta: {
            title: "订单详情"
        },
        components: {
            default: resolve => require(['../../components/order/order_details_buyer.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
     //卖家订单详情
     {
        path: '/order_details_seller',
        name: 'order_details_seller',
        meta: {
            title: "订单详情"
        },
        components: {
            default: resolve => require(['../../components/order/order_details_seller.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/order_evaluate',
        name: 'order_evaluate',
        meta: {
            title: "提交评价"
        },
        components: {
            default: resolve => require(['../../components/order/order_evaluate.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/order_refund',
        name: 'order_refund',
        meta: {
            title: "申请退款"
        },
        components: {
            default: resolve => require(['../../components/order/order_refund.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/order_pay',
        name: 'order_pay',
        meta: {
            title: "付款"
        },
        components: {
            default: resolve => require(['../../components/order/order_pay.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/order_return_goods_audit',
        name: 'order_return_goods_audit',
        meta: {
            title: "退货审核"
        },
        components: {
            default: resolve => require(['../../components/order/order_return_goods_audit.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    },
    {
        path: '/order_create',
        name: 'order_create',
        meta: {
            title: "确认订单"
        },
        components: {
            default: resolve => require(['../../components/order/order_create.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        },
        children:receive_address
    },
    {
        path: '/add_address1',
        name: 'add_address1',
        meta: {
            title: "收件人地址"
        },
        components: {
            default: resolve => require(['../../components/receive-address/add_address.vue'], resolve),
            headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    }
]
export default order;