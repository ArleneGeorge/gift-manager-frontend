<template>
    <div class="detail-container">
        <header class="detail-header">
            <div class="contact-info">
                <img class='profilePic' :src="friend.image_url" :alt="friend.first_name"/>


                <section class="address-information">
                    <h3> {{friend.first_name }} {{friend.last_name }} </h3> 
                    <p>{{friend.street}}</p>
                    <p>{{friend.city}}, {{friend.state}} {{friend.zip_code}}</p>
                    <p>{{friend.cell_phone}}</p>
                    <p> {{friend.email}} </p>      
                </section>

            </div>

            <ul id="links">
                <li> <router-link :to="{ name: 'edit-friend', params: { id: friend.id }}" >Edit Contact</router-link></li>
                <li> <router-link :to="{ name: 'user', params: { username: this.user.username }}" >Back</router-link></li>
                <li>  <router-link :to="{name: 'add-gift-idea'}">Add New Gift Idea</router-link></li>
                <li>   <router-link :to="{name: 'add-occasion'}">Add New Occasion for Friend</router-link></li>
            </ul>
        </header>

        <router-view/>

        <section id='occasion-section'>
            <section id='occasion-text'>
                <h2>Special Days</h2>
            </section>
            <ul class='occasions'>
                <li class='each-occasion' v-for="occasion in friend.occasions" :key="occasion.id">
                <h2>{{occasion.occasion}}: {{occasion.month}} {{occasion.day}}, {{occasion.year}} </h2>
                <router-link id='edit-occsion-button' :to="{ name: 'edit-occasion', params: { id: occasion.id }}" >Edit Occasion</router-link>
                </li>
            </ul>
        </section>

        <section id="gift-section">
            <section id='gift-text'>
                <h2>Gift Ideas</h2>
            </section>
            <div class='gift-div'>
                <ul class='gifts'>
                    <li class='each-gift' v-for="gift in friend.gifts" :key="gift.id">
                        <img :src="gift.image_url" :alt="gift.name"/>
                        <h2>{{gift.name}}</h2>
                        <h2>{{gift.note}}</h2> 
                    <section id='buttons'>
                        <li><a v-bind:href='gift.link'>Buy Now</a></li>
                        <li><router-link :to="{ name: 'edit-gift', params: { id: gift.id }}" >Edit Gift</router-link></li>
                    </section>
                    </li>
                </ul>
            </div>

        </section>

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

    }
</script>

<style lang="scss">
    #occasion-text{
        font-size: 2rem;
    }
    #gift-text{
        font-size: 2rem;
    }
    .gifts{
        display: grid;
        width: 80%;
        margin: auto;
        grid-template-columns: repeat(3, 32%);
        column-gap: 30px;
        padding-top: 5rem;
    }
    .gift-div{
        height: 30rem;;
    }
    .detail-header{
        text-align: center;
    }
    .detail-container{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .address-information{
        margin-left: 1rem;
    }
    .contact-info{
        display: flex;
        color: rgb(38,56,118);
        justify-content: center;
        margin-bottom: 2rem;
    }
    .contact-info > img {
        border-radius: .5rem;
    }
    li > img{
        max-width: 15rem;
        border-radius: .5rem;
    }
    .profilePic{
        max-width: 15rem;
    }

    #links{
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        display: block;
        color: white;
        text-align: center;    
    }
    #links > li {
        display: inline;
        margin: 1rem;
        outline: outset;
        text-decoration: none;
    }
    a{
        text-decoration: none;
    }
    #edit-occsion-button{
        margin: 1rem;
        width: 8rem;
        outline: outset;
        text-decoration: none;
        outline-color: white;
    }

    #gift-section{
        display: flex;
        flex-direction: column;
        color: rgb(38,56,118);
        justify-content: center;
        text-align: center;
        margin-bottom: 5rem;
    }

    #occasion-section{
        display: flex;
        flex-direction: column;
        color: rgb(38,56,118);
        justify-content: center;
        text-align: center;
        margin-bottom: 5rem;
    }


    li{
        list-style: none;
    }
    .each-gift{
        width: 20rem;
        text-align: center;
        display: flex;
        align-self: baseline;
        flex-direction: column;
        margin: 1rem
    }
    .each-occasion{
        margin: 1rem
    }
    #buttons > li {
        display: inline;
        text-decoration: none;
        padding: 0;
        overflow: hidden;
        color: white;
        margin: .5rem;
    }

    #buttons{
        margin-left: -4.25rem;
        font-size: 20px;
        color: rgb(38,56,118);
    }
    a:visited{
        color: rgb(38,56,118);
    }


</style>