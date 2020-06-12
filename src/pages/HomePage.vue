<template>
    <div class="home">
        <Filters />
        <MoviesList />
    </div>
</template>

<script>
    import Filters from "../components/Filters";
    import MoviesList from "../components/MoviesList";
    import {mapActions} from "vuex";

    export default {
        name: "Home",
        components: {
            MoviesList,
            Filters
        },
        data() {
          return {

          }
        },
        methods: {
            ...mapActions(['getDataFromAPI']),
        },
        mounted() {
            this.$store.commit('setType', 'discover');
            this.getDataFromAPI()
        }
    }
</script>

<style scoped>
    .home {
        margin: 0 200px 0 200px;
    }
</style>