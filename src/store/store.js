import Vue from "vue"
import Vuex from "vuex"
import DataService from "../sevices/dataService";
import UserService from "../sevices/userService";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        type: '',
        search: '',
        movieList: [],
        movieID: {
            type: String
        },
        movieDetails: {},
        filters: {
            with_genres: [],
            year: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            region: ['US']
        },
        genreGroups: [],
        currentUser: {},
        loggedIn: false,
        auth: localStorage.token || ''
    },
    mutations: {
        setType(state, payload) {
            state.type = payload
        },

        setSearch(state, payload) {
            state.search = payload
        },

        setMovieID(state, payload) {
            state.movieID = payload
        },

        setLoggedIn(state) {
            state.loggedIn = !!localStorage.token
        },

        setCurrentUser(state, payload) {
            // console.log('payload: ', payload)
            state.currentUser = payload
            state.currentUser['bookmarks'] = []
        },

        emptyMoviesList(state) {
          state.movieList = []
        },

        async setDataFromAPI(state) {
            if (state.type === 'getMovie') {
                state.movieDetails = (await DataService[state.type](state.search)).data;
                console.log('movieDetails: ', state.movieDetails)
            }
            else if (state.type === 'getGenres') {
                state.genreGroups = (await DataService[state.type](state.search)).data.genres;
                state.filters.with_genres = [...state.genreGroups].map(i => i.name);
            }
            else {
                state.movieList = (await DataService[state.type](state.search)).data.results;
            }
        },

        addMovieToMovieList(state) {
            console.log('addMovieToMovieList ', state.movieDetails)
            state.movieList.push(state.movieDetails)
        },

        //make automated login
        addUserToDatabase(state) {
            console.log(state.currentUser)
            UserService.create(state.currentUser)
                .then(response => {
                    state.currentUser.id = response.data.id;
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                });
            state.currentUser = {}
        },

        login(state) {
            console.log("logining")
            UserService.login({email: state.currentUser.email, password: state.currentUser.password})
                .then(response => {
                    state.loggedIn = true
                    state.auth = response.data.token
                    state.currentUser = response.data.userDetails.user
                    console.log(state.currentUser)
                    localStorage.setItem('userID', state.currentUser.id)
                    localStorage.setItem('token', response.data.token)
                    console.log('response: ', response)
                })
                .catch(e => {
                    console.log('Error: ', e)
                })
        },

        logout(state) {
            state.auth = ''
            delete localStorage.token
        },

        updateBookMark (state) {
            console.log('updatefrom state')
            UserService.updateUser(state.currentUser)
                .then(response => {
                    state.currentUser = response.data
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
        },

        getUserByID(state) {
            UserService.getUserByID(localStorage.getItem('userID'))
                .then(response => {
                    state.currentUser = response.data
                    console.log('aaaaaaaa:', response)
                    console.log('state.currentUser: ', state.currentUser)
                })
                .catch(e => {
                    console.log(e)
                })
        }

    },
    actions: {
        getDataFromAPI() {
            store.commit('setDataFromAPI')
        },

        addUserToDatabase() {
            store.commit('addUserToDatabase')
        },

        login() {
            store.commit('login')
        },

        logoutInStore() {
            store.commit('logout')
            store.commit('setLoggedIn')
        },

        updateBookMark() {
            store.commit('updateBookMark')
        },

        addMovieToMovieList() {
            store.commit('addMovieToMovieList')
        },

        emptyMoviesList() {
            store.commit('emptyMoviesList')
        },

        getUserByID() {
            store.commit('getUserByID')
        }
    },
    getters: {
        getMoviesList: state => state.moviesList
    },
})

export default store