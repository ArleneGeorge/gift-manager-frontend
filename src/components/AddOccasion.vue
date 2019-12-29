<template>
<div class='whole-occasion-form'>
  <section class='occasion-title'>
   <h1> Add Occasion</h1>
  </section>
   <div class="occasion-form-container">
     
      <form id='new-occasion-form' @submit.prevent="addOccasion()" >
        <input  name="occasion"  placeholder="Occasion Name"/>
        <input  name="month"  placeholder="Month"/>
        <input  name="day"  placeholder="Day"/>
        <input  name="year"  placeholder="Year"/>
        <!-- <input  name="reminder_time" placeholder="How many days before would you like to be reminded"/> -->
        <input type="hidden" name="friend_id" :value="friend.id" >
        <input id='submit-button' type="submit" value="Add Date">
      </form>
      
    </div>
        <section class='occasion-back-button-container'>
          <button class='occasion-back-button'><a @click="$router.go(-1)">Cancel</a></button>
        </section>


  
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
.whole-occasion-form{
  width: 64%;
  height: 30rem;
  background-image: url('/prezzie-background.jpeg');
  background-size: 100% 100%;
  text-align: center;
  margin-left: 18%;
  margin-top: 3rem;
 

.occasion-form-container{
   display: flex;
  max-width: 10rem;
}
.occasion-title{
  padding-top: 5%;
}
#new-occasion-form{
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

}
button > a {
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
