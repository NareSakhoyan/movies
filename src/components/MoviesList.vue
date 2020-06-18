<template>
    <div id="moviesList">
        <div class="row">
            <Movie :movie = "movie" v-for="(movie, index) in moviesList" :key="index" class="movie"/>
        </div>
    </div>
</template>

<script>
    import Movie from "./Movie";

    export default {
        name: "moviesList",
        data() {
            return {
                hasDataObj: new Object(
                    {
                        poster_path: "/jwl71Qa8YS7fJXR7Z6AHSsHWLRi.jpg",
                        id: 503,
                        overview: "A packed cruise ship traveling the Atlantic is hit and overturned by a massive wave, compelling the passengers to begin a dramatic fight for their lives.",
                        title: "Poseidon"
                    }
                )
            }
        },
        components: {
            Movie
        },
        computed: {
            moviesList() {
                let tmp = this.$store.state.movieList
                // tmp.unshift(Object(this.hasDataObj))
                return tmp
            }
        },

    }
</script>

<style scoped>
    .movie {
        margin-bottom: 50px;
    }

</style>