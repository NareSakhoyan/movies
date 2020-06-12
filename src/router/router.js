import Vue from "vue";
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage'
import MoviePage from '../pages/MoviePage'
import SearchPage from '../pages/SearchPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import auth from "../utils/auth";

Vue.use(VueRouter)

function requireAuth(to, from, next) {
    if (!auth.loggedIn){
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
    else{
        next()
    }
}


const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/register', name: 'register', component: RegisterPage},
    {path: '/login', name: 'login', component: LoginPage, beforeEnter: requireAuth},
    {path: '/profile', name: 'profile', component: ProfilePage},
    {path: '/search/:search?', name: 'search', component: SearchPage},
    {path: '/movie/:id', name: 'movie-details', component: MoviePage},
    {path: '*', redirect: HomePage},
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router