<template>
    <div class='edit-occasion-container'>
        <div class='all-occasion'>
            <div class='edit-occasion'>
                <section class='previous-information'>
                    <p>{{occasion.occasion}}</p>
                    <p>{{occasion.month}} {{occasion.day}}, {{occasion.year}}</p> 
                    <button class='delete-button' type='submit' @click.prevent="deleteOccasion()" >Delete Occasion</button>
                </section>
                <section id="occasion-edit-form-container">
                    <form id='edit-occasion-form' @submit.prevent="editOccasion()" >

                    <label for='name'>Occasion name</label>
                    <input  name="name"  v-bind:value="occasion.occasion"/>
                    <label for='name'>Month</label>
                    <input  name="month"  v-bind:value="occasion.month"/>
                    <label for='day'>Day</label>
                    <input  name="day"  v-bind:value="occasion.day"/>
                    <label for='year'>Year</label>
                    <input  name="year"  v-bind:value="occasion.year"/>
                    <input id='submit-button' type="submit" value="Submit Changes">
                    </form>
                <a class='back-button' @click="$router.go(-1)">Cancel</a>


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
    .edit-occasion-container > a{
        display: inline-flex;
        width: 8rem;
        outline: outset;
        outline-color: white;
        background-color: white;
        justify-content: center;
        margin-left: -2rem;
    }

    .edit-occasion-container{
        display: flex;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.432);
        width: 100%;
        height: 100%;
        justify-content: center;    
    }

    .all-occasion{
        display: flex;
        margin: 5rem;
        justify-content: center;
        width: 42rem;
        height: 55rem;
    }

    .edit-occasion{
        width: 200%;
        background-image: url('/prezzie-background.jpeg');
        background-size: 100% 100%;
    }

    .edit-occasion-form-container{
        display: block;
        max-width: 51rem;
        height: 25rem;
        justify-items: center;
        margin-top: 7rem;
    }

    .previous-information{
        margin-top: 15rem;
        text-align: center;
    }

    #edit-occasion-form > input {
        width: 40rem;
        height: 25px;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        font-size: 15px;
        margin: 1rem;
    }   

    label{
        margin-left: 1rem;
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
        margin-bottom: 1rem; 
        background-color: white;
    }

    #submit-button{
        color: rgb(38,56,118);
        font-family: 'Calistoga', cursive;
        font-weight: 40px;
        margin-bottom: 1rem;
        outline: outset;
        outline-color: white;
    }

    .back-button{
        margin-left: 20rem;
    }

</style>

