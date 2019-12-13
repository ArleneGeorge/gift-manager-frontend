<template>
<div>
  <h2> Add Gift</h2>

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
        <a class='back-button' @click="$router.go(-1)">Go Back</a>

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
.back-button{
  background-color: white;

}
.gift-form-container{
  display: flex;
  max-width: 30rem;
  
}

#new-gift-form{
    display: inline;
    margin-left: auto;
    margin-right: auto;
    

    input {
    width: 50rem;
    height: 25px;
    box-shadow: 1px 2px hsl(0, 0%, 70%);
    margin: 1em;
    margin-bottom: 1rem;
}

#submit {
  width: 25rem;
  margin-top: 2rem;
 text-align: center;
}
   
}
 

</style>
