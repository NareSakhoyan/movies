<template>
    <div class="search">
        <MoviesList :movies-list="moviesList"/>
    </div>
</template>

<script>
    import MoviesList from "../components/MoviesList";
    import DataService from "../dataService";

    export default {
        name: "RealatedMovies",
        props: {

        },
        components: {
            MoviesList
        },
        data() {
            return {
                id: this.$route.params.id,
                moviesList: []
            }
        },
        methods: {
            setAllMoviesFromAPI(id){
                DataService.relatedMovies(id)
                    .then(response => {
                        console.log(response.data.results)
                        this.moviesList = response.data.results
                        console.log('response.data.results: ', response.data.results)
                        return response.data.results
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        },
        mounted() {
            this.setAllMoviesFromAPI(this.id)
        }
    }
</script>

<style scoped>

</style>
