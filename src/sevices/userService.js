import http from '../http-common'

class UserService {
    getAllUsers() {
        return http.get('/users')
    }

    create(user) {
        return http.post('/users', user)
    }

    getUserByID(id) {
        return http.get('/users/:id', id)
    }

    findByEmail(email) {
        return http.get(`/users/?email=${email}`)
    }

    updateUser(user) {
        return http.put(`/users/`, user)
    }
}

export default new UserService()