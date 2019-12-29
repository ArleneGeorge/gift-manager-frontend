<template>
<div class='all-new-gift-form'>
  <section class='add-gift-title'>
  <h2> Add Gift</h2>
  </section>

   <div class="gift-form-container">
     
     
     
      <form id='new-gift-form' @submit.prevent="addGift()" >
        <input  name="image_url"  placeholder="image link"/>
        <input  name="link"  placeholder="Item Link"/>
        <input  name="name"  placeholder="Item Name"/>
        <input  name="note"  placeholder="Information"/>
        <input type="hidden" name="friend_id" :value="friend.id" >
         <input id='submit-button' type='submit' value="Add Gift">
        </form>
    
   </div>
       <button class='gift-back-button'> <a class='back-button' @click="$router.go(-1)">Cancel</a> </button>

   </div>
</template>

<script>
export default {
  data() {
      return {
        gift: '',
      }
    },
     mounted () {
 this.$store.dispatch("fetchGifts")
    
  },
   computed: {
        friend(){
            return this.$store.getters.getFriendById(this.$route.params.id)
        },
    },
   
    methods: {
      addGift() {
     const formData = new FormData(event.target)
        event.target.reset()
    
        const gift = {
            image_url: formData.get("image_url"),
            link: formData.get("link"),
            name: formData.get("name"),
            note: formData.get("note"),
            friend_id: formData.get("friend_id"),
        }


                fetch('https://gift-manager-back-end.herokuapp.com/gifts', {
                  method: 'POST',
                  headers: {
                'Content-Type': 'application/json'
            },
                  body: JSON.stringify({gift})
                   
                })
                .then(response => response.json())
                .then(response => { 
                    (this.$router.push({ name: 'friend-detail', params: { id: response.friend_id } }))
                }).then(this.$store.dispatch("fetchGifts"))
                
            },
    }
}
</script>

<style lang="scss">

.all-new-gift-form{
  width: 64%;
  height: 30rem;
  background-image: url('/prezzie-background.jpeg');
  background-size: 100% 100%;
  text-align: center;
  margin-left: 18%;
  margin-top: 3rem;

}
.add-gift-title{
  padding-top: 5%;
}
.gift-form-container{
  display: flex;
  max-width: 10rem;
  
}

#new-gift-form{
    margin-left: 22rem;
    

    input {
    width: 220%;
    height: 10%;
    margin-top: 0.75rem;
    box-shadow: 1px 2px hsl(0, 0%, 70%);
}

#submit {
  height: 60 px;
      margin-top: 1rem;
      text-align: center;
      box-shadow: 1px 2px hsl(0, 0%, 70%);
}
}

.gift-back-button > a {
  display: inline-flex;
  width: 8rem;
  outline: outset;
  outline-color: white;
  background-color: white;
  justify-content: center;
  margin-top: 3rem;
  margin-left: -2rem;
}
 

</style>
