//注册相关的
const register = [{
    path: '/register',
    name: 'register',
    meta: {
        title: "我的网店"
    },
    components: {
        default: resolve => require(['../../components/register/register.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
}, 
{
    path: '/register1',
    name: 'register1',
    meta: {
        title:"网店说明"
    },
    components: {
        default: resolve => require(['../../components/register/register1.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},
{
    path: '/register2',
    name: 'register2',
    meta: {
        title: "我的网店"
    },
    components: {
        default: resolve => require(['../../components/register/register2.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},{
    path: '/info',
    name: 'info',
    meta: {
        title: "填写信息"
    },
    components: {
        default: resolve => require(['../../components/register/info.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
    
},{
    path: '/infoQ',
    name: 'infoQ',
    meta: {
        title: "填写信息"
    },
    components: {
        default: resolve => require(['../../components/register/infoQ.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
    
},{
    path: '/shenfen',
    name: 'shenfen',
    meta: {
        title: "身份认证"
    },
    components: {
        default: resolve => require(['../../components/register/shenfen.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},{
    path: '/oncezhi',
    name: 'oncezhi',
    meta: {
        title: "缴保证金"
    },
    components: {
        default: resolve => require(['../../components/register/onceZhi.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},{
    path: '/back_pay',
    name: 'back_pay',
    meta: {
        title: "缴保证金"
    },
    components: {
        default: resolve => require(['../../components/register/back_pay.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
},{
    path: '/real',
    name: 'real',
    meta: {
        title: "实名认证"
    },
    components: {
        default: resolve => require(['../../components/register/real.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
  },{
    path: '/',
    name: '',
    meta: {
        title: "我的网店"
    },
    components: {
        default: resolve => require(['../../components/register/register.vue'], resolve),
        headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
}]
export default register;