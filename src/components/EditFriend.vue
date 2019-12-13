<template>
<div class='edit-contact-container'>

  <h1> Edit {{friend.first_name}}'s Information</h1>

<div>
  <a class='back-button' @click="$router.go(-1)">Cancel Changes</a>
</div>
  
  <button type='submit' @click.prevent="deleteFriend()" >Delete  Contact</button>



   <div class="friend-form-container">
     
      <form id='new-friend-form' @submit.prevent="editFriend()" >
        <input  name="image_url"  v-bind:value="friend.image_url"/>
        <input  name="first_name"  v-bind:value="friend.first_name"/>
        <input  name="last_name"  v-bind:value="friend.last_name"/>
        <input  name="email"  v-bind:value="friend.email"/>
        <input  name="relationship" v-bind:value="friend.relationship"/>
        <input  name="street" v-bind:value="friend.street"/>
        <input  name="street2" v-bind:value="friend.street2"/>
        <input  name="city" v-bind:value="friend.city"/>
        <input  name="state"  v-bind:value="friend.state"/>
        <input  name="zip_code"  v-bind:value="friend.zip_code"/>
        <input  name="cell_phone" v-bind:value="friend.cell_phone"/>
        <!-- <input type="hidden" name="user_id" :value="user.id" > -->
        <!-- <input id='input' name="user_id" v-bind:value="friend.user_id"/> -->
        <input id='submit-button' type="submit" value="Edit Contact">

        </form>

    </div>

   </div>
</template>

<script>
export default {
     computed: {
        friend(){
            return this.$store.getters.getFriendById(this.$route.params.id)
        
        },
    },    

    mounted () {
    this.$store.dispatch("fetchFriends")
  },


    methods: { 
        deleteFriend(){
            const id = this.friend.id   
             fetch(`https://gift-manager-back-end.herokuapp.com/friends/${id}`, {
             method: 'DELETE' 
             }).then(this.$router.replace('/view-all-friends'))
            
    },  

      editFriend() {
        const id = this.friend.id

        // const {image_url, first_name, last_name, email, relationship, street, street2, city, state, zip_code, cell_phone} = this.friend
        // const friend = {image_url, first_name, last_name, email, relationship, street, street2, city, state, zip_code, cell_phone}
        const formData = new FormData(event.target)

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
            // user_id: formData.get("user_id")
        }
     
                fetch(`https://gift-manager-back-end.herokuapp.com/friends/${id}`, {
                  method: 'PATCH',
                  headers: {
                'Content-Type': 'application/json'
            },
                  body: JSON.stringify({friend})
                   
                }).then(response => response.json())
                .then(response => {
                    (this.$router.push({ name: 'friend-detail', params: { id: response.id } }))
                })
                 
            
    },
        
            
    }
}
</script>

<style lang="scss">
.edit-contact-container{
    position: absolute;
    background-color: rgba(255, 255, 255, 0.432);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
}

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
    font-size: 15px;
}
#submit {
  width: 50rem;
  height: 25 px;
  margin-top: 1rem;
  text-align: center;
  box-shadow: 1px 2px hsl(0, 0%, 70%);
  margin-bottom: 1rem; 
}
.back-button{
  background-color: white;

}

  
}

</style>