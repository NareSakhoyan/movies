// import {getMongoManager} from "typeorm";
// const {User}  = require("../entity/User");
// const {createConnection, Connection} = require('typeorm')
// const {config}  = require(".././dbconfig");

import {User} from "../entity/User";
import {createConnection} from "typeorm";
import {config} from "vue-form/src/config";


const connection = async () => {
    await createConnection(config)
}//type=Connection

this.connection()

module.exports = class UserController {
    manager = connection.manager()

    create = async (userToAdd) => {
        const user = new User()
        user.firstName = userToAdd.firstName
        user.lastName = userToAdd.lastName
        user.email = userToAdd.email
        user.password = userToAdd.password
        user.phone = userToAdd.phone
        user.bookmarks = userToAdd.bookmarks

        await this.manager.save(user)
    }

    selectAll = async () => {
        let timber = await this.manager.find()
    }

    selectOne = async (id) => {
        let timber = await this.manager.findOne({id: id})
    }

    findWithEmail = async (email) => {
        let timber = await this.manager.findOne({email: email})
    }
}
