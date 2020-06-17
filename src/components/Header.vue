<template>
    <div id="header">
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/">
                                Home <span class="sr-only">(current)</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
                        <router-link :to="`/search/${searchText}`">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="handleSearch">Search</button>
                        </router-link>
                        <router-link  v-if="loggedIn" v-bind:to="`/profile`">
                            <a class="navbar-brand">
                                <img src="../assets/profile.png" width="30" height="30" alt="" loading="lazy">
                            </a>
                        </router-link>
                        <router-link v-if="loggedIn" to="/logout"><button type="button" class="btn btn-success" @click="logout()">Log out</button></router-link>
                        <router-link v-if="!loggedIn" to="/login"><button type="button" class="btn btn-success loginButton">Log in</button></router-link>
                        <router-link v-if="!loggedIn" to="/register"><button type="button" class="btn btn-primary">Sign Up</button></router-link>
                    </form>
                </div>
            </nav>
        </div>
    </div>
</template>s

<script>
    import {mapActions} from 'vuex'
    import auth from "../utils/auth";

    export default {
        name: "Header",
        data() {
            return {
                moviesList: [],
            }
        },
        computed: {
            searchText: {
                get: function () {
                    return '';
                    // return this.$store.state.search;
                },
                set: function (e) {
                    this.$store.commit('setSearch', e)
                }
            },
            loggedIn() {
                return this.$store.state.loggedIn
            }
        },
        methods: {
            ...mapActions(['logoutInStore']),
            handleSearch() {
                this.$store.commit('setMovieList');
            },
            logout(){
                this.logoutInStore()
                auth.logout()
            },
        },
        beforeMount() {
            this.$store.commit('setLoggedIn')
        }

    }
</script>

<style scoped>
#header{
    margin-bottom: 100px
}
</style>