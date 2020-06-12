<template>
    <div class="search">
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
                searchTxt: this.$route.params.searchTxt,
            }
        },
        computed: {
        },
        methods: {
            ...mapActions(['getDataFromAPI']),
        },
        mounted() {
            const { search } = this.$route.params
            if(search) {
                this.$store.commit('setSearch', search);
                //I couldn't get data from props so I committed separately
                this.$store.commit('setType', 'search');
                this.getDataFromAPI()
            }
        },
        updated() {

        }
    }
</script>

<style scoped>

</style>