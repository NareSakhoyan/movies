import http from '../http-common'
// import config from "../../movies/src/config/config";

class UserService {
    getAllUsers() {
        return http.get('/user')
    }

    create(user) {
        return http.post('/user/', user)
    }

    getUserByID(id) {
        return http.get(`/user/${id}`)
    }

    updateUser(user) {
        return http.put(`/user/${user.id}`, user)
    }

    login(user) {
        return http.post('/auth/login', user)
    }

    async getMe(user) {
        return await http.get('/user/me', user)
    }
}

export default new UserService()