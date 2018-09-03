import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      'status':null ,//
      'title_name':'我的啊啊啊', //
      'route_name':null, //
        'router_push':null,
    },
    mutations: {
      change_status (state,status) {
        state.status=status;
      },
      change_title (state,title) {
        state.title_name=title;
      },
      change_route_name(state,route_name){
        state.route_name=route_name;
      },
      change_route_push(state,route_push){
        state.route_push=route_push;
      }
    }
  })
  export default store;
//   store.commit('increment')