
export default {
    login (state, cb) {
        cb = arguments[arguments.length - 1]
        if (localStorage.token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }
        pretendRequest(state, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
                this.onChange(true)
            } else {
                if (cb) cb(false)
                this.onChange(false)
            }
        })
    },

    getToken () {
        return localStorage.token
    },

    logout (cb) {
        delete localStorage.token
        // delete localStorage.userID
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {}
}

function pretendRequest (state, cb) {
    setTimeout(() => {
        console.log('state.loggedIn: ', state.loggedIn)
        if (state.loggedIn) {
            cb({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
                // token: 56465465
            })
        } else {
            cb({ authenticated: false })
        }
    }, 0)

}