<template>
    <div id="app">
         <router-view /> 
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'App',
        data() {
            return {

            }
        },
        mounted() {
        },
        methods: {
            ...mapActions([
                'fetchToken'
            ]),
        },
        created() {
            this.fetchToken()
        }
    }
</script>

<style lang="scss">

    @import url('https://fonts.googleapis.com/css?family=Calistoga&display=swap');
    .all{
        width: 100%;
    }
    body{
        font-family: 'Calistoga', cursive;
        color: rgba(38,56,118);
        background-color: rgba(190,208,244);
    }

    #app{
        display: inline-block;
        justify-content: center
    }

    .logo{
        display: flex;
        justify-self: center;
        margin-left: 29rem;
    }
    .logo > img {
        width: 60%;
        margin-top: 3rem; 
    }
</style>