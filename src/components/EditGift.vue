<template>
    <div class='edit-gift-container'>
        <div class='all-gift'>
            <div class='edit-gift'>
                <section class='previous-information'>
                    <img :src="gift.image_url" :alt="gift.name"/>
                    <p>{{gift.name}}</p>
                    <p>{{gift.notes}}</p> 
                </section>
            <button class='edit-gift-delete-button' type='submit' @click.prevent="deleteGift()" >Delete Gift Idea</button>

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
            <a class='back-button' @click="$router.go(-1)">Cancel</a>

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
        justify-content: center;
        width: 42rem;
        height: 60rem;
    }

    .edit-gift-container{
        display: flex;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.432);
        width: 100%;
        height: 100%;
        justify-content: center;  
    }

    .edit-gift-container > a{
        display: inline-flex;
        width: 8rem;
        outline: outset;
        outline-color: white;
        background-color: white;
        justify-content: center;
        margin-left: -2rem;

    }

    .edit-gift-form-container{
        display: block;
        max-width: 51rem;
        height: 25rem;
        justify-items: center;
        margin-top: 7rem;
    }

    .edit-gift{
        width: 200%;
        background-image: url('/prezzie-background.jpeg');
        background-size: 100% 100%;
    }
    .previous-information > img {
        max-width: 8rem;
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
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        font-size: 15px;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }

    label{
        margin-left: 1rem;
    }

    .edit-gift-delete-button {
        width: 30rem;
        height: 25 px;
        margin: 1rem;
        text-align: center;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        outline: outset;
        outline-color: white;
        margin-left: 5rem;
        background-color: white;
    }
    .back-button{
        height: 25px;
        width: 40rem;
        margin-top: 2rem;
        text-align: center;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        margin-left: 1px; 
        outline: outset;
        outline-color: white;
        background-color: white;
    }

    #submit-button{
        outline: outset;
        outline-color: white;
        color: rgb(38,56,118);
        font-family: 'Calistoga', cursive;
        font-weight: 40px;
        margin-top: 1rem;
    }

</style>

