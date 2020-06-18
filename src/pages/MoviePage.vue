<template>
    <div id="moviePage">
        <div class="container">
            <div class="row">
                <div class="col-md-4 ">
                    <img :src="getImgUrl(movieDetails.poster_path)" class="card-img-top" alt="...">
                </div>
                <div class="col-md-8 card" style="width: auto;">
                    <div class="card-body">
                        <div class="row">
                            <div class="title col-11">
                                <a :href="`${movieDetails.homepage}`"><h1 class="card-title">{{movieDetails.title}}</h1></a>
                                <span class="date"> ({{movieDetails.release_date}})</span>
                            </div>
                            <div class="col-1" v-if="loggedIn">
                                <img :src="bookmarkIcon" alt="bookmark" class="bookmarkImg" @click="bookmarkClick">
<!--                                <img src="../assets/bookmark.jpg" alt="bookmark" class="bookmarkImg" @click="bookmarkClick">-->
<!--                                <img src="../assets/bookmarked.jpg" alt="bookmark" class="bookmarkImg" @click="bookmarkClick">-->
                            </div>
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
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            },
            movieDetails() {
                return this.$store.state.movieDetails
            },
            loggedIn() {
                return this.$store.state.loggedIn
            },
            currentUser() {
                return this.$store.state.currentUser
            },
            bookmarkIcon () {
                if (this.loggedIn){
                    const bookmarkSrc = '/img/bookmark.19637974.jpg'
                    const bookmarkedSrc = 'data:image/jpeg;base64,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'
                    if (this.isBookmarked) {
                        return bookmarkedSrc
                    } else {
                        return bookmarkSrc
                    }
                }
                return ''
            },
            isBookmarked() {
                return this.setIsBookmarked()
            }
        },
        methods: {
            ...mapActions(['getDataFromAPI', 'updateBookMark']),
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
            },
            bookmarkClick(e) {
                console.log(e)
                let bookmarksArr = this.currentUser.bookmarks
                if (this.setIsBookmarked()) {
                    bookmarksArr.splice(bookmarksArr.findIndex(i => i == this.id), 1)
                }
                else{
                    bookmarksArr.push(this.id)
                }
                this.updateBookMark()
            },
            setIsBookmarked() {
                if (this.loggedIn){
                    return this.currentUser.bookmarks.includes(parseInt(this.id))
                }
            },
        },
        mounted() {
            this.updatePage()
            window.scrollTo({
                top: 0,
                left: 0,
            });
        },
        watch: {
            id(to, from) {
                if(to!==from){
                    this.updatePage()
                    this.scrollToTop()
                }
            }
        },
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
    .col-1 {
        margin: 0;
        padding: 0;
    }
    .bookmarkImg {
        height: 50px;
        width: auto;
    }
    .relatedMovies {
        margin: 100px;
    }
</style>