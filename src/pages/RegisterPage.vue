<template>
    <div>
        <div class="col-4 offset-sm-4">
            <h2>Register</h2>
            <form>
                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name: </label>
                    <div class="col-sm-10">
                        <input v-model="user.name" type="text" class="form-control" id="name" placeholder="John">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="surname" class="col-sm-2 col-form-label">Surname: </label>
                    <div class="col-sm-10">
                        <input v-model="user.surname" type="text" class="form-control" id="surname" placeholder="Doe">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input v-model="user.email" type="email" class="form-control" id="email" placeholder="john.doe@example.com">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="phone" class="col-sm-2 col-form-label">Phone: </label>
                    <div class="col-sm-10">
                        <input v-model="user.phone" type="text" class="form-control" id="phone" placeholder="+37412345678">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-sm-2 col-form-label">Password: </label>
                    <div class="col-sm-10">
                        <input v-model="user.pass" type="password" class="form-control" id="password" placeholder="password">
                    </div>
                </div>
                <router-link to="/login"><button type="button" class="btn btn-primary" @click="saveUser">Sign Up</button></router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import UserService from "../sevices/userService";

    export default {
        name: "Register",
        data(){
            return{
                user: {
                    id:null,
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    pass: '',
                },
            };
        },
        methods: {
            saveUser() {
                let data = {
                    name: this.user.name,
                    surname: this.user.surname,
                    email: this.user.email,
                    phone: this.user.phone,
                    pass: this.user.pass,
                };
                UserService.create(data)
                    .then(response => {
                        this.user.id = response.data.id;
                        console.log(response.data)
                    })
                    .catch(e => {
                        console.log(e)
                    });
            }
        },
        mounted() {
            this.user = {}
        }
    }
</script>

<style scoped>
</style>