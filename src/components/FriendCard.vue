<template>
 
    <div class='friend-card'>
        <section>
            <img :src="friend.image_url" :alt="friend.first_name"/>

            
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