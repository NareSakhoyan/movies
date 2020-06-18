import axios from 'axios'

class DataService {
    BASE_URI = 'https://api.themoviedb.org/3/';
    API = 'api_key=0c0abc3a3afe095e5248a68a605f2a0f';

    discover(filters, sortBy = 'release_date.asc'){
        //'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0c0abc3a3afe095e5248a68a605f2a0f'
        console.log('filters: ', filters)
        let filterString = ``
        for (const i in filters) {
            filterString += `&${i}=${filters[i]}`
        }
        const url = `${this.BASE_URI}discover/movie?sort_by=${sortBy}&include_adult=false${filterString}&${this.API}`
        console.log(url)
        return this.axiosCall(url)
    }

    getMovie(id) {
        id = parseInt(id)
        const url = `${this.BASE_URI}movie/${id}?${this.API}`
        // console.log(url)
        return this.axiosCall(url)
    }

    search(searchTxt) {
        //https://api.themoviedb.org/3/search/movie?api_key=0c0abc3a3afe095e5248a68a605f2a0f&query=Ad%20Astra&page=1
        if (searchTxt){
            if (searchTxt.includes(' ')){
                searchTxt = searchTxt.split(' ').join('%20')
            }
            const url = `${this.BASE_URI}search/movie?${this.API}&query=${searchTxt}&page=1`
            // console.log(url)
            return this.axiosCall(url)
        }
        else{
            return []
        }
    }

    relatedMovies(id) {
        //https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=0c0abc3a3afe095e5248a68a605f2a0f&language=en-US&page=1
        const url = `${this.BASE_URI}movie/${id}/similar?${this.API}&page=1`
        // console.log(url)
        return this.axiosCall(url)
    }

    getGenres(lang= 'en-US') {
        //https://api.themoviedb.org/3/genre/movie/list?api_key=0c0abc3a3afe095e5248a68a605f2a0f&language=en-US
        const url = `${this.BASE_URI}genre/movie/list?${this.API}&language=${lang}`;
        return this.axiosCall(url)
    }

    axiosCall(url) {
        return axios.get(url)
            .then(response => {
                return response
            })
            .catch(error => {
                throw error
            })
    }
}

export default new DataService()