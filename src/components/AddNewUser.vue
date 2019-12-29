<template>
  <div class="all-new-user">
    <section class='new-user-text'>
      <h1>Create Account</h1>
    </section>
    <div class="new-user-form-container">

      <form id='new-user-form' @submit.prevent="addUser()" >
        <input  name="avatar" placeholder="Image Link"/>
        <input  name="first_name"  placeholder="First Name"/>
        <input  name="last_name"  placeholder="Last Name"/>
        <input  name="phone_number"  placeholder="Phone Number"/>
        <input  name="email"  placeholder="Email"/>
        <input  name="username" placeholder="Username"/>   
        <input  type='password' name="password" placeholder="Password"/>
        <input id='submit-button' type="submit" value="Create Account">
      </form>
      <section class='route'> 
        <router-link :to="{name: 'login'}"> Already Registered? SignIn </router-link>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {

      addUser() {
        const formData = new FormData(event.target)

        event.target.reset()

        const user = {
          avatar: formData.get("avatar"),
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          email: formData.get("email"),
          phone_number: formData.get("phone_number"),
          username: formData.get("username"),
          password: formData.get("password"),
        }

        fetch('https://gift-manager-back-end.herokuapp.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)

        }).then(response => response.json())
          .then(response => {
            (this.$router.push({ name: 'user', params: { username: response.username } }))
        })
      }
    }
  }
</script>

<style lang="scss">

  .all-new-user{
    display: block;
    margin: 15rem;
    color: rgb(38,56,118);
    background-color: rgba(255, 255, 255, 0.623);
  }

  .new-user-text{
    text-align: center;
    font-size: 2rem;
  }

  .new-user-form-container{
    display: block;
    max-width: 51rem;
    height: auto;
    margin-left: 12rem;
  }
  #new-user-form{
    display: inline;
    justify-content: center;

      input {
        width: 30rem;
        height: 25px;
        margin-top: 1rem;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
      }
      submit {
        width: 35rem;
        height: 25 px;
        margin-top: 1rem;
        text-align: center;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        margin-left: 6px; 
        color: rgb(38,56,118);
      }
  }
  .route{
    margin: 10px;
  }

</style>
