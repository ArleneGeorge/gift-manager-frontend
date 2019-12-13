<template>
<div>
  <h1> Add Contact</h1>
   <div class="friend-form-container">
     
      <form id='new-friend-form' @submit.prevent="addFriend()" >
        <input  name="image_url"  placeholder="image link"/>
        <input  name="first_name"  placeholder="First Name"/>
        <input  name="last_name"  placeholder="Last Name"/>
        <input  name="email"  placeholder="Email"/>
        <input  name="relationship" placeholder="Relationship"/>
        <input  name="street" placeholder="street"/>
        <input  name="street2" placeholder="Street"/>
        <input  name="city" placeholder="City"/>
        <input  name="state"  placeholder="State"/>
        <input  name="zip_code"  placeholder="Zip Code"/>
        <input  name="cell_phone" placeholder="Phone number"/>
        <input type='hidden' name="user_id" :value="this.user.id" >
        <input id='submit-button' type="submit" value="Add Contact">
        </form>
        
    </div>
    <!-- <li> <router-link :to="{ name: 'user', params: { username: this.user.username }}" >Close Add Form</router-link></li> -->
       <a class='back-button' @click="$router.go(-1)">Cancel</a>

   </div>
</template>

<script>
export default {


   data() {
      return {
        friend: '',
      }
    },
    mounted () {
    this.$store.dispatch("fetchFriends")
    this.$store.dispatch("fetchUsers")
    
  },

    computed: {
        user(){
            return this.$store.getters.getUserbyUsername(this.$route.params.username)
        
        },
    }, 
    methods: {
  
      addFriend() {
     const formData = new FormData(event.target)
        event.target.reset()
        
    
        const friend = {
            image_url: formData.get("image_url"),
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            relationship: formData.get("relatioship"),
            street: formData.get("street"),
            street2: formData.get("street2"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip_code: formData.get("zip_code"),
            cell_phone: formData.get("cell_phone"),
            user_id: formData.get("user_id"),
        }

        
      // this.$store.state.friends = [friend, ...this.$store.state.friends]
                fetch('https://gift-manager-back-end.herokuapp.com/friends', {
                  method: 'POST',
                  headers: {
                'Content-Type': 'application/json'
            },
                  body: JSON.stringify({friend})
                   
                }).then(response => response.json())
                .then(response => {
                    (this.$router.push({ name: 'friend-detail', params: { id: response.id } }))
                })
            
    } 
            
    }
}
</script>

<style lang="scss">

.friend-form-container{
   display: flex;
  max-width: 30rem;
 
}
#new-friend-form{
    display: inline;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;

    input {
    width: 50rem;
    height: 25px;
    margin-top: 1rem;
    box-shadow: 1px 2px hsl(0, 0%, 70%);
}
#submit {
  width: 50rem;
  height: 25 px;
  margin-top: 1rem;
  text-align: center;
  box-shadow: 1px 2px hsl(0, 0%, 70%);
}
}
  

</style>
