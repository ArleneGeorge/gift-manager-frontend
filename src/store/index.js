import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    friends: [],
    gifts: [],
    users: [],
    loggingIn: false,
    loginError: null,
    token: null,
    occasions: [],
    // username: [],
  },  
  getters: {
    getFriendById: state => id => {
      return state.friends.find(friend => friend.id == id)
    },

    getGiftById: state => id => {
      return state.gifts.find(gift => gift.id == id)
    },
    getOccasionById: state => id => {
      return state.occasions.find(occasion => occasion.id == id)
    },
    
    getUserbyUsername: state => username => {
      return state.users.find(user => user.username == username)
    },

  },
  
  
  mutations: {
    setFriends(state, friends){
      state.friends = friends
    },   

    setGifts(state, gifts){
      state.gifts = gifts
    },
    setOccasions(state, occasions){
      state.occasions = occasions
    },

    setUsers(state, users){
      state.users = users
    },

    loginBeginning: state => state.loggingIn = true,
    loginEnd: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
  },
    updateToken: (state, token) => {
    state.token = token
  },
  logout: (state) => {
    state.token = null
  }
    
  },

  actions: {
    fetchFriends({commit} ){
      fetch('https://gift-manager-back-end.herokuapp.com/friends')
      .then(response => response.json())
      .then(people => {
        commit("setFriends", people)
      })
    },
    fetchGifts({commit}){
      fetch("https://gift-manager-back-end.herokuapp.com/gifts")
      .then(response => response.json())
      .then(gift => {
        commit("setGifts", gift)
      })
    },
    fetchOccasions({commit}){
      fetch("https://gift-manager-back-end.herokuapp.com/occasions")
      .then(response => response.json())
      .then(occasion => {
        commit("setOccasions", occasion)
      })
    },
    
    fetchUsers({commit}){
      fetch("https://gift-manager-back-end.herokuapp.com/users", {
        method: 'GET',
        headers: {Authorization: 'bearer ' + localStorage.token}
             
          }).then(response => response.json())
      .then(user => {
        commit("setUsers", user)
      })
      
    },

    loginUser({ commit }, loginData) {
      commit('loginBeginning');
  
      axios.post('https://gift-manager-back-end.herokuapp.com/login', {
        ...loginData
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        commit('loginEnd', null)
        commit('updateToken', response.data.token)
        router.push({ name: 'user', params: { username: response.data.username } })
      })
    
      .catch(error => {
        commit('loginEnd', error.response.data.error)
        commit('updateToken', null)
      })
    },

    fetchToken({commit}) {
      commit('updateToken', localStorage.getItem('token'))
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit('logout')
      router.push('/login')
    }
  },


  modules: {
  }
})
