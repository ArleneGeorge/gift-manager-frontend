<template>
    <div class='userPage'>
      <router-view />
      <div class='contact-text'>
      <h2 >  Contacts</h2>
      </div>
      <router-link :to="{name: 'add-friend'}">Add New Contact</router-link>
        <ul class='friends'>
      <li class='friend-card' v-for="friend in friends" :key="friend.id">
         <router-link :to="{ name: 'friend-detail', params: { id: friend.id }}" > {{friend.first_name}}  {{friend.last_name}}</router-link>
        <FriendCard :friend="friend" />
      </li>
        </ul>

      
    
    </div>
    
</template>


<script>
  import FriendCard from "@/components/FriendCard"

  export default {
   
    components: {
      FriendCard,
    },
    computed: {
      friends(){

      return this.$store.state.friends
      
    },   
  },
  mounted () {

  this.$store.dispatch("fetchFriends")
    
  },
  methods: {
    
        }

  }
</script>

<style lang="scss">
#contact-text{
  font-size: 3rem;
}
.userPage{
  width: 100%;
  background-color: rgba(255, 255, 255, 0.623);
}
.friends {
// display: flex;
//   flex-flow: row wrap;
//   font-size: 2rem;
 display: grid;
    width: 80%;
    margin: auto;
    grid-template-columns: repeat(3, 32%);
    column-gap: 30px;
    padding-top: 5rem;

  li {
  list-style: none;
  margin-bottom: 1rem;
  max-width: 20 rem;
  box-shadow: 3px 3px hsl(0, 0%, 70%);
  padding: 2rem;
  margin: 1rem;
  // background-color: rgba(255, 255, 255, 0.623);

  img{
  max-width: 15rem;
  

  }
}
  
}


</style>


