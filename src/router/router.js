import Vue from "vue";
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage'
import MoviePage from '../pages/MoviePage'
import SearchPage from '../pages/SearchPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'

Vue.use(VueRouter)
function requireAuth(to, from, next) {
    if (localStorage.token){
        next()
    }
    else{
        console.log('go login')
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
}


const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/register', name: 'register', component: RegisterPage},
    {path: '/login', name: 'login', component: LoginPage},
    {path: '/logout', redirect: {name: 'home'}},
    {path: '/profile', name: 'profile', component: ProfilePage, beforeEnter: requireAuth},
    {path: '/search/:search?', name: 'search', component: SearchPage},
    {path: '/movie/:id', name: 'movie-details', component: MoviePage},
    {path: '*', redirect: {name: 'home'}},
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router