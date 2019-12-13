<template>
<div class='all'>
  <section class='welcome-text'>
  <h1>Welcome To</h1>
  </section>
<div class="all-login">
  <div><img id="logo" src="Prezzie-logo.jpeg"></div>
  
  <router-view/>
  
  <p v-if="loginError">{{loginError}}</p>
   <div class="login-form-container">
     <h1> Login</h1>
      <form  id='login-form' @submit.prevent="loginSubmit" >
        <input  type='text' v-model="username" name="username"  placeholder="Username"/>
        <input  type='password' v-model='password' name="password"  placeholder="Password"/>
        <input id='submit-button' type="submit" value="Login">
        </form>
        <section class="new-user">
        <router-link :to="{name: 'add-new-user'}"> New User? Register </router-link>
        </section>
    
        
    </div>
   </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState([
          'loggingIn',
          'loginError',
        ])
    },
   data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      ...mapActions([
        'loginUser'
      ]),
      loginSubmit(){
        this.loginUser({
          username: this.username,
          password: this.password,
        })
      }
      
    }
}
</script>

<style lang="scss">

.all-login{
  display: flex;
  outline: inset;
  margin: 15rem;
  color: rgb(0,40,255);
  background-color: rgba(255, 255, 255, 0.623);
  justify-content: center;

}
.welcome-text{
  text-align: center;
  font-size: 5rem;
  margin-top: 5rem;
  margin-bottom: -10rem; 
}
    .login-form-container{
    display: block;
    max-width: 51rem;
    height: 25rem;
    justify-items: center;
    margin-top: 7rem;
    margin-left: 2rem;
    }
    #login-form{
    display: inline;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
   

        input {
        width: 40rem;
        height: 25px;
        margin-top: 1rem;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        }
        #submit {
        width: 40rem;
        height: 25 px;
        margin-top: 1rem;
        text-align: center;
        box-shadow: 1px 2px hsl(0, 0%, 70%);
        margin-left: 1px; 
        }
        
    }
  
  #logo{
    width: 35rem;
  }
  .new-user{
    padding: 1rem;
  }

</style>
