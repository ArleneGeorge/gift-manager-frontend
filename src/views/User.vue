<template>
    <div class='user-page'>
        <header class="userInfo">
            <section class='user-info'>
        
        <h1>Hello {{user.first_name}}  {{user.last_name}}</h1>
        <img :src="user.avatar" :alt="user.first_name"/>
        <ul id='buttons'>
        <li><button @click=logout>Logout</button></li>
        <li><router-link :to="{name: 'add-friend'}">Add New Contact</router-link></li>

        </ul>
        </section>
        
        </header>
        


    <router-view />
      <section id='contact-text'>
      <h1> Contacts</h1>
      </section>
        <ul class='friends'>
      <li v-for="friend in user.friends" :key="friend.id">
         <router-link :to="{ name: 'friend-detail', params: { id: friend.id }}" > {{friend.first_name}}  {{friend.last_name}}</router-link>
        <FriendCard :friend="friend" />

        
      </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import FriendCard from "@/components/FriendCard"

export default {

    components: {
      FriendCard,
    },
  

    methods: {
        ...mapActions([
            'logout'
        ])
    },

 computed: {
        user(){
            return this.$store.getters.getUserbyUsername(this.$route.params.username)
        
        },
        friends(){

      return this.$store.state.friends
      
    }, 
    },
      mounted () {

    this.$store.dispatch("fetchUsers")
    this.$store.dispatch("fetchFriends")
    
    
    },
}
</script>

<style lang="scss">
#contact-text{
    text-align: center;
}
.user-page{
    position: absolute;
    background-color: rgba(255, 255, 255, 0.432);
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100%;
}
.userInfo{
  display: flex;
  color: rgb(0,40,255);
  justify-content: center;
  margin-bottom: 2rem;
  
  
}
.user-info > img{
    border-radius: .5rem;
}
#buttons > li {
    display: inline;
    text-decoration: none;
    padding: 0;
    overflow: hidden;
    outline: outset;
    color: white;
    margin: .5rem;
}
#buttons{
    margin-left: -4.25rem;
    font-size: 20px;
   color: rgb(0,40,255);
}
button {
    border: none;
    background-color: transparent;
    font-family: 'Calistoga', cursive;
    font-size: 20px;
    color: rgb(0,40,255);
    
}
a:visited{
    color: rgb(0,40,255);
}
</style>
