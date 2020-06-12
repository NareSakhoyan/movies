<template>
    <div id="moviePage">
        <div class="container">
            <div class="row">
                <div class="col-md-4 ">
                    <img :src="getImgUrl(movieDetails.poster_path)" class="card-img-top" alt="...">
                </div>
                <div class="col-md-8 card" style="width: auto;">
                    <div class="card-body">
                        <div class="title">
                            <a :href="`${movieDetails.homepage}`"><h1 class="card-title">{{movieDetails.title}}</h1></a>
                            <span class="date"> ({{movieDetails.release_date}})</span>
                        </div>
                        <h5 class="card-text">{{movieDetails.tagline}}</h5>
                        <p class="card-text">{{movieDetails.overview}}</p>
                        <h5 class="card-text">Genres: </h5>
                        <p class="card-text">{{getNames(movieDetails.genres, 'genres')}}</p>
                        <h5 class="card-text">Production Companies: </h5>
                        <p class="card-text">{{getNames(movieDetails.production_companies, 'prodComp')}}</p>
                        <h5>Popularity: </h5>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" :style="`width: ${movieDetails.popularity}%;`" :aria-valuenow="`${movieDetails.popularity}`" aria-valuemin="0" aria-valuemax="1000">
                                {{movieDetails.popularity}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="relatedMovies">
            <RelatedMovies />
        </div>
    </div>
</template>

<script>
    import RelatedMovies from "../components/RelatedMovies";
    import {mapActions} from 'vuex'

    export default {
        name: "MoviePage",
        components: {
            RelatedMovies
        },
        data() {
            return {
                // id: this.$route.params.id
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            },
            movieDetails() {
                return this.$store.state.movieDetails
            }
        },
        methods: {
            ...mapActions(['getDataFromAPI']),
            getImgUrl (url) {
                return `https://image.tmdb.org/t/p/w200${url}`
            },
            getNames(nameSrc, type) {
                let txt = ``
                let sign = type==='genres'? ' / ': ', '
                for (const name of nameSrc){
                    txt+= `${name.name}${sign}`
                }
                return txt.substring(0, txt.length-2)
            },
            updatePage() {
                // this.$store.commit('setMovieID', id);
                this.$store.commit('setSearch', this.id);
                this.$store.commit('setType', 'getMovie');
                this.getDataFromAPI()

                // this.$store.commit('setMovieID', id);
                this.$store.commit('setSearch', this.id);
                this.$store.commit('setType', 'relatedMovies');
                this.getDataFromAPI()
            },
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        },
        mounted() {
            this.updatePage()
        },
        watch: {
            id(to, from) {
                if(to!==from){
                    this.updatePage()
                }
            }
        },
        updated() {
            this.scrollToTop()
        }

    }
</script>

<style scoped>
    #moviePage{
        margin-top: 100px;
    }
    .card-img-top{
        padding: 0;
    }
    .card-body {
        padding-top: 20px;
    }
    .col-md-4 {
        padding: 0 20px 0 0;
    }
    .progress-bar {
        background-color: #330944;
    }
    a{
        color: #330944;
        text-decoration: none;
    }
    a:hover{
        color: #651289;
        text-decoration: none;
    }
    .title{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
    }
    .date {
        font-size: 26px;
    }
</style>