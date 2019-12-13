<template>
<div class='edit-occasion-container'>
    <div class='all-occasion'>
    <div class='edit-occasion'>
        <img :src="occasion.image_url" :alt="occasion.name"/>
        <p>{{occasion.occasion}}</p>
        <p>{{occasion.month}} {{occasion.day}}, {{occasion.year}}</p> 
       <a class='back-button' @click="$router.go(-1)">Back</a>
        <button class='delete-button' type='submit' @click.prevent="deleteOccasion()" >Delete Occasion</button>
        
         <section id="occasion-edit-form-container">
        <form id='edit-occasion-form' @submit.prevent="editOccasion()" >
                
                <label for='name'>Occasion name</label>
                <input  name="name"  v-bind:value="occasion.occasion"/>
                <label for='name'>Month</label>
                <input  name="month"  v-bind:value="occasion.month"/>
                <label for='day'>Day</label>
                <input  name="day"  v-bind:value="occasion.day"/>
                <label for='year'>Day</label>
                <input  name="year"  v-bind:value="occasion.year"/>
                <input id='submit-button' type="submit" value="Submit Changes">
        </form>
    
         </section>
         
    </div>
    
    </div>
    </div>

</template>

<script>
export default {
    
    computed: {
        occasion(){
            return this.$store.getters.getOccasionById(this.$route.params.id)
        
        },
    
         
    },    

    mounted () {
    this.$store.dispatch("fetchOccasions")
  },


    methods: {
        editOccasion(){
                const id = this.occasion.id  
                const formData = new FormData(event.target)

                const occasion = {
                    name: formData.get("name"),
                    month: formData.get("month"),
                    day: formData.get("day"),
                    year: formData.get("year"),
                }
            // const {friend_id, image_url, link, name, note} = this.gift
            // const gift = {friend_id, image_url, link, name, note}


            fetch(`https://gift-manager-back-end.herokuapp.com/occasions/${id}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
            
                    body: JSON.stringify({ occasion })
                    
                }).then(response => response.json())
                .then(response => {
                    (this.$router.push({ name: 'friend-detail', params: { id: response.friend_id } }))
                })

            
        },

        deleteOccasion(){
            const id = this.occasion.id            
             fetch(`https://gift-manager-back-end.herokuapp.com/occasions/${id}`, {
             method: 'DELETE' 
             }).then(this.$router.go(-1))
                
            
        },
    },
}
</script>

<style lang='scss'>
.all-occasion{
  display: flex;
  margin: 15rem;
  justify-content: center;
  width: 42rem;

}
.edit-occasion-container{
    display: flex;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.432);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    
}
.edit-occasion-form-container{
    display: block;
    max-width: 51rem;
    height: 25rem;
    justify-items: center;
    margin-top: 7rem;
    margin-left: 2rem;
}
.edit-gift{
display: block;

    
}
.edit-gift > img {
max-width: 15rem;
}

#edit-gift-form{
    display: inline;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
}
input {
        width: 40rem;
        height: 25px;
        margin-top: 1rem;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        font-size: 15px;
        }
        .delete-button {
        width: 40rem;
        height: 25 px;
        margin-top: 1rem;
        text-align: center;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        margin-left: 1px; 
        outline: outset;
        outline-color: white;
        }
        .back-button{
        height: 25px;
        width: 40rem;
        margin-top: 1rem;
        text-align: center;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        margin-left: 1px; 
        outline: outset;
        outline-color: white;
        }
        #submit-button{
        outline: outset;
        outline-color: white;
        color: rgb(0,40,255);
        font-family: 'Calistoga', cursive;
        font-weight: 40px;
        }
        
</style>

