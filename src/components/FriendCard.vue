<template>
 
    <div class='friend-card'>
        <section>

        <router-link :to="{ name: 'friend-detail', params: { id: friend.id }}" ><img :src="friend.image_url" :alt="friend.first_name"/></router-link>

            
        </section>
    </div>
</template>

<script>
    export default {
        props: {
            friend: Object,
        },
        
        
    }
</script>

<style lang="scss">



</style>