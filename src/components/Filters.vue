<template>
    <div class="filters">
        <div class="form-group col-md-4">
            <form>
                <div v-for="(value, filter) in filters" :key="filter">
<!--                                                                toCapitalize-->
                    <label>{{filter==='with_genres'? 'Genres': filter[0].toUpperCase()+filter.slice(1, filter.length)}}</label>
                    <select id="" class="form-control" :name="filter" @change="changeFilter">
                        <option selected name="defaultSelect">Choose...</option>
                        <option v-for="(i, index) in value" :key="`${filter}${index}}`">{{i}}</option>
                    </select>
                </div>
            </form>
            <button class="btn btn-outline-success" @click="applyFilters">apply</button>
        </div>
    </div>
</template>

<script>
    //year, genre, region
    import {mapActions} from 'vuex'

    export default {
        name: "Filter",
        data() {
            return {
                filterModels: {},
            }
        },
        computed: {
            filters() {
                return this.$store.state.filters
            },
            genreGroups() {
                return this.$store.state.genreGroups
            }
        },
        methods: {
            ...mapActions(['getDataFromAPI']),
            makeObjectFromArray(obj) {
                let tmp = {}
                for (let i in obj) {
                    tmp[i] = ''
                }
                return tmp
            },
            changeFilter (e) {
                let value = e.target.value
                if (value === 'Choose...') return ;
                const key = e.target.name
                if (key === 'with_genres') {
                    value = this.genreGroups.filter(({name}) => {
                        return name===value
                    })[0].id
                }
                this.filterModels[key] = value
            },
            applyFilters() {
                this.$store.commit('setSearch', this.filterModels)
                this.$store.commit('setType', 'discover')
                this.getDataFromAPI()
                this.setFiltersValueChoose()
            },
            setFiltersValueChoose() {
                let selects = [...document.getElementsByName('defaultSelect')]
                // selects.pop()
                for (const i in selects) {
                    console.log('i: ', i)
                    selects[i]['selected'] = true
                }
            }
        },
        created() {
            this.$store.commit('setType', 'getGenres')
            this.getDataFromAPI()
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .col-md-4{
        padding: 0;
        margin-bottom: 50px;
    }
    button {
        margin-top: 15px;
    }
</style>

//login, addToFfAVORITES
//PROFILE IMAGE, INFO, FAVORITEfILMS