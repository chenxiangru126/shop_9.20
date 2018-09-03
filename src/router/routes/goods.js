//商品相关
 const goods=[
    {
        path: '/goods-list',
        name: 'goods_list',
        meta: {
            title: "商品列表"
        },
        components: {
            default:resolve => require(['../../components/goods-list/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,{
        path: '/shopping-cart',
        name: 'shopping_cart',
        meta: {
            title: "购物车"
        },
        components: {
            default:resolve => require(['../../components/shopping-cart/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,{
        path: '/goods-class',
        name: 'goods-class',
        meta: {
            title: "艺狗往"
        },
        components: {
            default:resolve => require(['../../components/goods-class/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    }  ,{
        path: '/goods-ls-class',
        name: 'goods-ls-class',
        meta: {
            title: "艺狗往"
        },
        components: {
            default:resolve => require(['../../components/goods-class/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,{
        path: '/goods-details-gwc',
        name: '',
        meta: {
            title: "商品详情"
        },
        components: {
            default:resolve => require(['../../components/goods-details-gwc/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    },{
        path: '/goods-details-sCart',
        name: 'goods-details-sCart',
        meta: {
            title: "商品详情"
        },
        components: {
            default:resolve => require(['../../components/goods-details-gwc/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,{
        path: '/goods-details-store',
        name: '',
        meta: {
            title: "商品详情"
        },
        components: {
            default:resolve => require(['../../components/goods-details-store/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,{
        path: '/my-goods-list',
        name: 'my-goods-list',
        meta: {
            title: "我的商品"
        },
        components: {
            default:resolve => require(['../../components/my-goods-list/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,{
        path: '/add-goods',
        name: '',
        meta: {
            title: "我的商品"
        },
        components: {
            default:resolve => require(['../../components/add-goods/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        } ,
        children:[
            {
                path: '/library-into',
                name: 'library-into',
                meta: {
                    title: "我的作品"
                },
                components: {
                    default:resolve => require(['../../components/library-into/index.vue'], resolve),
                    headers:resolve => require(['../../components/common/header.vue'], resolve)
                }
            },{
                path: '/my-work',
                name: '',
                meta: {
                    title: "我的作品"
                },
                components: {
                    default:resolve => require(['../../components/my-work/index.vue'], resolve),
                    headers:resolve => require(['../../components/common/header.vue'], resolve)
                }
            }
        ]
    } ,{
        path: '/goods-list-copyright',
        name: '',
        meta: {
            title: "版权价列表"
        },
        components: {
            default:resolve => require(['../../components/goods-list-copyright/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    // } ,{
    //     path: '/my-work',
    //     name: '',
    //     meta: {
    //         title: "我的作品"
    //     },
    //     components: {
    //         default:resolve => require(['../../components/my-work/index.vue'], resolve),
    //         headers:resolve => require(['../../components/common/header.vue'], resolve)
    //     }
    // } , {
    //     path: '/library-into',
    //     name: '',
    //     meta: {
    //         title: "我的作品"
    //     },
    //     components: {
    //         default:resolve => require(['../../components/library-into/index.vue'], resolve),
    //         headers:resolve => require(['../../components/common/header.vue'], resolve)
    //     }
    } ,  {
        path: '/shopping-list',
        name: 'shopping_list',
        meta: {
            title: "购物车"
        },
        components: {
            default:resolve => require(['../../components/shopping-list/index.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    } ,  
]
export default goods;   