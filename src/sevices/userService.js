import http from '../http-common'

class UserService {
    getAllUsers() {
        return http.get('/user')
    }

    create(user) {
        return http.post('/user', user)
    }

    getUserByID(id) {
        return http.get('/users/:id', id)
    }

    // findByEmail(email) {
    //     return http.get(`/users/?email=${email}`)
    // }

    updateUser(user) {
        return http.put(`/users`, user)
    }

    login(user) {
        return http.post('/auth/login', user)
    }
}

export default new UserService()