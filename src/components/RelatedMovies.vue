<template>
    <div class="search">
        <MoviesList />
    </div>
</template>

<script>
    import MoviesList from "../components/MoviesList";

    export default {
        name: "RelatedMovies",
        components: {
            MoviesList
        },
    }
</script>

<style scoped>

</style>
