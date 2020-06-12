import Vue from "vue"
import Vuex from "vuex"
import DataService from "./sevices/dataService";

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
        genreGroups: []
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

        async setDataFromAPI(state) {
            if (state.type === 'getMovie') {
                state.movieDetails = (await DataService[state.type](state.search)).data;
            }
            else if (state.type === 'getGenres') {
                state.genreGroups = (await DataService[state.type](state.search)).data.genres;
                state.filters.with_genres = [...state.genreGroups].map(i => i.name);
            }
            else {
                state.movieList = (await DataService[state.type](state.search)).data.results;
            }
        }
    },
    actions: {

        getDataFromAPI() {
            store.commit('setDataFromAPI')
        }
    },
    getters: {
        getMoviesList: state => state.moviesList
    },
})

export default store