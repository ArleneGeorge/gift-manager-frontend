<template>
    <div id="app">
  <!-- <section class='welcome-text'>
  <h1>Welcome To</h1>
  </section>
  <li>
  <router-link :to="{name: 'login'}"> Login </router-link>
  </li>
  <section class='logo'>
  <img src="Prezzie-logo.jpeg">
  </section> -->
   
<!-- <Login
        <header>
            <nav>
                <ul>
                    <li>
                        <router-link :to="{name: 'user'}"> Home </router-link>
                    </li> 
                    <li>
                        <router-link :to="{name: 'view-all-friends'}"> Contacts </router-link>
                    </li> 
                    <li>
                        <router-link :to="{name: 'login'}"> Login </router-link>
                    </li>
                    
                </ul>
            </nav>
        </header>
        <section id='main'>
       
        </section> 
          -->
         <router-view /> 

 
    </div>
</template>




<script>
// import Login from "@/components/Login.vue"
import { mapActions } from 'vuex'
    export default {
        name: 'App',
    //     components: {
    //     Login,
    // },
  
        data() {
            return {
               
            }
        },
        mounted() {
        },
        methods: {
            ...mapActions([
                'fetchToken'
            ]),
        },
        created() {
            this.fetchToken()
        }
    }
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Calistoga&display=swap');
.all{
  width: 100%;
}
body{
    font-family: 'Calistoga', cursive;
    color: rgb(0,40,255);
    background-attachment: fixed;
    background-image: url('https://cdn.pixabay.com/photo/2015/12/11/17/22/snow-1088470_960_720.jpg');
    background-size: 100% 100%;
    

}
#app{
    display: inline-block;
    justify-content: center
}
// #main{
//     display: flex;
// }
.logo{
    display: flex;
    justify-self: center;
    margin-left: 29rem;
}
.logo > img {
    width: 60%;
    margin-top: 3rem; 

}
</style>