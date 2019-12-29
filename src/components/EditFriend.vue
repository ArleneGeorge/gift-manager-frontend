<template>
  <div class='edit-contact-container'>
    <div class='edit-contact'>
      <section class='previous-contact-information'>
        <h1> Edit {{friend.first_name}}'s Information</h1>
      </section>
      <button class='delete-contact-button' type='submit' @click="deleteFriend()" >Delete  Contact</button>

      <div class="edit-friend-form-container">

        <form id='edit-friend-form' @submit.prevent="editFriend()" >
          <label for='image_url'>Image Link</label>
          <input  name="image_url"  v-bind:value="friend.image_url"/>
          <label for='first_name'>First Name</label>
          <input  name="first_name"  v-bind:value="friend.first_name"/>
          <label for='last_name'>Last Name</label>
          <input  name="last_name"  v-bind:value="friend.last_name"/>
          <label for='email'>Email</label>
          <input  name="email"  v-bind:value="friend.email"/>
          <label for='relationship'>Realtionship</label>
          <input  name="relationship" v-bind:value="friend.relationship"/>
          <label for='street'>Address</label>
          <input  name="street" v-bind:value="friend.street"/>
          <label for='street2'>Address Line 2</label>
          <input  name="street2" v-bind:value="friend.street2"/>
          <label for='city'>City</label>
          <input  name="city" v-bind:value="friend.city"/>
          <label for='state'>State</label>
          <input  name="state"  v-bind:value="friend.state"/>
          <label for='xip_code'>Zip Code</label>
          <input  name="zip_code"  v-bind:value="friend.zip_code"/>
          <label for='cell_phone'>Cell Phone</label>
          <input  name="cell_phone" v-bind:value="friend.cell_phone"/>
          <input id='submit-button' type="submit" value="Edit Contact">
        </form>

      </div>
      <div>
        <a class='cancel-button' @click="$router.go(-1)">Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    computed: {
      friend(){
        return this.$store.getters.getFriendById(this.$route.params.id)
      },

      user(){
        return this.$store.getters.getUserbyUsername(localStorage.username)
      },
    },    

    mounted () {
      this.$store.dispatch("fetchFriends")
      this.$store.dispatch("fetchUsers")
    },


    methods: { 
      deleteFriend(){
        const id = this.friend.id   
        fetch(`https://gift-manager-back-end.herokuapp.com/friends/${id}`, {
        method: 'DELETE' 
        }).then(this.$router.push({ name: 'user', params: { username: this.user.username} }))

      },  


      editFriend() {
        const id = this.friend.id

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
    width: 100%;
    height: 100%;
    margin-left: 28rem;
  }
  .edit-contact{
    width: 35%;
    background-image: url('/Prezzie.png');
    background-size: 100% 100%;
    height: 160%;
    text-align: center;
  }


  #edit-friend-form > input {
    width: 28rem;
    height: 25px;
    margin: .45rem;
    box-shadow: 1px 2px hsl(0, 0%, 70%);
    font-size: 15px;
  }
  #submit {
    width: 24rem;
    height: 25 px;
    margin-top: 1rem;
    text-align: center;
    box-shadow: 1px 2px hsl(0, 0%, 70%);
    margin-bottom: 1rem; 
  }
  .cancel-button{
    background-color: white;
    outline: outset;
    outline-color: white;

  }
  .delete-contact-button {
    width: 24rem;
    margin-top: 1rem;
    text-align: center;
    box-shadow: 1px 2px hsl(0, 0%, 70%);
    outline: outset;
    outline-color: white;
    margin-bottom: -2;
    background-color: white; 
  }

  .edit-friend-form-container{
    margin-top: 2rem;
  }
  .previous-contact-information{
    padding-top: 12rem;
  }

</style>