<template>
    <div class="col-3">
        <img :src="`${getImgUrl(movie.poster_path) || '../assets/logo.png'}`" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{movie.title}}</h5>
            <p class="card-text">{{movie.overview}}</p>
            <router-link :to="{name: 'movie-details', params: {id: movie.id}}">
                <button class="btn btn-primary">More...</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Movie",
        props: {
            movie: Object
        },
        methods: {
            getImgUrl (url) {
                return `https://image.tmdb.org/t/p/w200${url}`
            },
        },
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        float: left;
    }
    .card-title{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .card-text{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
    .card-body{
        padding: 20px 0 20px 0;
    }
</style>