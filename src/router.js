import Vue from "vue";
import VueRouter from 'vue-router'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import SearchPage from './pages/SearchPage'

Vue.use(VueRouter)

const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/search/:search?', name: 'search', component: SearchPage},
    {path: '/movie/:id', name: 'movie-details', component: MoviePage},
    {path: '*', redirect: HomePage},
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router