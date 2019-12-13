<template>
<div>
  <h1> Add Occasion</h1>
   <div class="friend-form-container">
     
      <form id='new-friend-form' @submit.prevent="addOccasion()" >
        <input  name="occasion"  placeholder="Occasion Name"/>
        <input  name="month"  placeholder="Month"/>
        <input  name="day"  placeholder="Day"/>
        <input  name="year"  placeholder="Year"/>
        <!-- <input  name="reminder_time" placeholder="How many days before would you like to be reminded"/> -->
        <input type="hidden" name="friend_id" :value="friend.id" >
        <input id='submit-button' type="submit" value="Add Date">
        </form>
      
    </div>
    
        <a class='back-button' @click="$router.go(-1)">Go Back</a>

  
   </div>
</template>

<script>
export default {
    computed: {
        friend(){
            return this.$store.getters.getFriendById(this.$route.params.id)
        },
    },
   data() {
      return {
        occasion: '',
      }
    },
    methods: {
      
      addOccasion() {
     const formData = new FormData(event.target)
       
        event.target.reset()
        
    
        const occasion = {
            occasion: formData.get("occasion"),
            month: formData.get("month"),
            day: formData.get("day"),
            year: formData.get("year"),
            reminder_time: formData.get("reminder_time"),
            friend_id: formData.get("friend_id"),
        }

        
      // this.$store.state.occasion = [occasion, ...this.$store.state.friend.occasions]
     
                fetch('https://gift-manager-back-end.herokuapp.com/occasions', {
                  method: 'POST',
                  headers: {
                'Content-Type': 'application/json'
            },
                  body: JSON.stringify({occasion})
                   
                }).then(response => response.json())
                .then(response => { 
                    (this.$router.push({ name: 'friend-detail', params: { id: response.friend_id } }))
                })
            
    }

            
            
    }
}
</script>

<style lang="scss">
.back-button{
  background-color: white;

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
