<template>
    <div>
        <div class="col-4 offset-sm-4">
            <h2>Login</h2>
            <form @submit.prevent="submitLogin">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                    <small id="emailHelp" class="form-text text-muted">(hint: password1)</small>
                </div>
                <p v-if="error" class="error">Your email or password is incorrect</p>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
    // import auth from '../utils/auth'
    import {mapActions} from 'vuex'
    export default {
        data () {
            return {
                email: '',
                password: '',
                error: false,

            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn
            }
        },
        methods: {
            ...mapActions(['login']),
            submitLogin () {
                this.$store.commit('setCurrentUser', {email: this.email, password: this.password})
                this.login()
                setTimeout(() => {
                    if (this.loggedIn){
                        this.$router.replace(this.$route.query.redirect || '/')
                    }
                    else{
                        this.error = true
                    }
                }, 100)
            }
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>