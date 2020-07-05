import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    changeOptions : function () {
      console.log(process.env.VUE_APP_API_URL)
      return axios.get(process.env.VUE_APP_API_URL+"/change/options")
    },
    changes : function () {
      return axios.get(process.env.VUE_APP_API_URL+"/change")
    },
    changeRoom : function () {
      return axios.get(process.env.VUE_APP_API_URL+"/change/room")
    },
    timetableOptions : function ({commit}, options) {
      console.log(commit, options)
      return axios.get(process.env.VUE_APP_API_URL+"/timetable/group",{params:options})
    }
  },
  modules: {
  }
})
