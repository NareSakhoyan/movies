import http from '../http-common'

class UserService {
    findWithEmail(email) {
        http.get('/', email)
    }
}

export default UserService