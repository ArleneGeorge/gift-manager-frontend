import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

import Login from "@/components/Login.vue"
import ViewAllFriends from "@/views/ViewAllFriends"
import AddNewUser from "@/components/AddNewUser"
import AddFriend from "@/components/AddFriend"
import AddGift from "@/components/AddGift"
import AddOccasion from "@/components/AddOccasion"
import FriendDetail from "@/components/FriendDetail"
import EditFriend from "@/components/EditFriend"
import EditGift from "@/components/EditGift"
import EditOccasion from "@/components/EditOccasion"
import User from "@/views/User"



Vue.use(VueRouter)

const routes = [
   
      {
      path: "/",
      redirect: '/login',
     
    },
      {
      path: "/login",
      name: "login",
      component: Login,
  
    },
    {
      path: "/friend-detail/:id",
      name: "friend-detail",
      component: FriendDetail,
      children: [
        {
          path: "/:id/add-gift-idea",
          name: "add-gift-idea",
          component: AddGift,
      },
      
        {
          path: "/:id/add-occasion",
          name: "add-occasion",
          component: AddOccasion,
      },
    ]
  },      
  {
    path: "/edit-gift/:id",
    name: "edit-gift",
    component: EditGift,
    },
  {
    path: "/edit-occasion/:id",
    name: "edit-occasion",
    component: EditOccasion,
    },
    {
      path: "/edit-friend/:id",
      name: "edit-friend",
      component: EditFriend,
      },
      {
        path: "/add-new-user",
        name: "add-new-user",
        component: AddNewUser,
    },
    {
      path:'/user/:username',
      name: 'user',
      component: User,
      children: [
        {
          path: "/user/:username/:id/view-all-friends",
          name: "view-all-friends",
          component: ViewAllFriends,
        },
        {
          path: "/user/:username/add-friend",
          name: "add-friend",
          component: AddFriend,
      }, 
      ]
      
      
  },
    {
      path: '*',
      redirect: '/user/:username'
    },

  
]
  
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// protected route 


// router.beforeEach((to, from, next) => {
//   store.dispatch('fetchToken');
  
//   if (to.fullPath === '/login') {
//     if (!store.state.token) {
//       next('/login');
//     }
//   }
//   if (to.fullPath === '/login') {
//     if (store.state.token) {
//       next('');
//     }
//   }
//   else next();
// })

export default router