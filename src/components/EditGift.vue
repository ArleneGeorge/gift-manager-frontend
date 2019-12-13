<template>
<div class='edit-gift-container'>
    <div class='all-gift'>
    <div class='edit-gift'>
        <img :src="gift.image_url" :alt="gift.name"/>
        <p>{{gift.name}}</p>
        <p>{{gift.notes}}</p> 
       <a class='back-button' @click="$router.go(-1)">Back</a>
        <button class='delete-button' type='submit' @click.prevent="deleteGift()" >Delete Gift Idea</button>
        
         <section id="gift-edit-form-container">
        <form id='edit-gift-form' @submit.prevent="editGift()" >
                <label for='image_url'>Image Link</label>
                <input  name="image_url"  v-bind:value="gift.image_url"/>
                
                <label for='link'>Gift Link</label>
                <input  name="link"  v-bind:value="gift.link"/>
                <label for='name'>Item Name</label>
                <input  name="name"  v-bind:value="gift.name"/>
                <label for='note'>Item Notes</label>
                <input  name="note"  v-bind:value="gift.note"/>
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
        gift(){
            return this.$store.getters.getGiftById(this.$route.params.id)
        
        },
    
         
    },    

    mounted () {
    this.$store.dispatch("fetchGifts")
  },


    methods: {
        editGift(){
                const id = this.gift.id  
                const formData = new FormData(event.target)

                const gift = {
                    image_url: formData.get("image_url"),
                    link: formData.get("link"),
                    name: formData.get("name"),
                    note: formData.get("note"),
                }
            // const {friend_id, image_url, link, name, note} = this.gift
            // const gift = {friend_id, image_url, link, name, note}


            fetch(`https://gift-manager-back-end.herokuapp.com/gifts/${id}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
            
                    body: JSON.stringify({ gift })
                    
                }).then(response => response.json())
                .then(response => {
                    (this.$router.push({ name: 'friend-detail', params: { id: response.friend_id } }))
                })

            
        },

        deleteGift(){
            const id = this.gift.id            
             fetch(`https://gift-manager-back-end.herokuapp.com/gifts/${id}`, {
             method: 'DELETE' 
             }).then(this.$router.go(-1))
                
            
        },
    },
}
</script>

<style lang='scss'>
.all-gift{
  display: flex;
  margin: 15rem;
  justify-content: center;
  width: 42rem;

}
.edit-gift-container{
    display: flex;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.432);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    
}
.edit-gift-form-container{
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

