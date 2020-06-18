<template>
    <div class="search">
        <div v-if="!searchParameterFromRoute">
            <h3 align="center">You can search what you want</h3>
        </div>
        <MoviesList/>
    </div>
</template>

<script>
    import MoviesList from "../components/MoviesList";
    import {mapActions} from 'vuex'

    export default {
        name: "Search",
        components: {
            MoviesList
        },
        data() {
            return {
                // searchTxt: this.$route.params.searchTxt,
            }
        },
        computed: {
            searchParameterFromRoute() {
                // return this.$route.params.search
                return this.$route.params.search || this.$store.state.search
            }
        },
        methods: {
            ...mapActions(['getDataFromAPI']),
            searchFunction() {
                const search = this.searchParameterFromRoute
                if(search) {
                    this.$store.commit('setSearch', search);
                    this.$store.commit('setType', 'search');
                    this.getDataFromAPI()
                }
            }
        },
        mounted() {
            console.log('searchMounted')
            this.searchFunction()
        },
        updated() {
            this.searchFunction()
        }
    }
</script>

<style scoped>
    .search {
        margin: 100px;
    }
</style>