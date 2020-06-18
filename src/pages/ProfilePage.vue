<template>
    <div class="profile">
       <div class="row">
           <form>
               <div class="form-group row">
                   <label class="col-sm-2 col-form-label">Name: </label>
                   <div class="col-sm-10">
                       <input type="text" readonly class="form-control-plaintext" :value="currentUser.name">
                   </div>
               </div>
               <div class="form-group row">
                   <label class="col-sm-3 col-form-label">Surname: </label>
                   <div class="col-sm-9">
                       <input type="text" readonly class="form-control-plaintext" :value="currentUser.surname">
                   </div>
               </div>
               <div class="form-group row">
                   <label class="col-sm-2 col-form-label">Email: </label>
                   <div class="col-sm-10">
                       <input type="text" readonly class="form-control-plaintext" :value="currentUser.email">
                   </div>
               </div>
           </form>
           <MoviesList />
       </div>
    </div>
</template>

<script>
    import MoviesList from "../components/MoviesList";
    import {mapActions} from 'vuex'

    export default {
        name: "ProfilePage",
        components: {
            MoviesList
        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser
            }
        },
        methods: {
            ...mapActions(['addMovieToMovieList', 'emptyMoviesList', 'getDataFromAPI']),
            async setBookmarksList() {
                this.emptyMoviesList()
                const bookmarks = this.$store.state.currentUser.bookmarks
                for (const i in bookmarks) {
                    this.$store.commit('setSearch', bookmarks[i])
                    this.$store.commit('setType', 'getMovie')
                    await this.getDataFromAPI()
                }
          }
        },
        mounted() {
            this.setBookmarksList()
        },
        updated() {
            this.emptyMoviesList()
        }
    }
</script>

<style scoped>
    .profile {
        margin: 100px;
    }
</style>