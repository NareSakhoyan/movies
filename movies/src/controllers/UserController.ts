import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController{

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "email", "name", "surname", "phone", "bookmarks", "password"] //We dont want to send the passwords on response
        });
        //Send the users object
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {

        //Get the ID from the url
        // const id = req.params.id;

        // if (id != res.locals.jwtPayload.userID){
        //     res.status(401).send("Unauthorized");
        //     return;
        // }

        const id = res.locals.jwtPayload.userID

        const email = '';

        //Get the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "email", "name", "surname", "phone", "bookmarks"] //We dont want to send the passwords on response
            });
            res.send(user)
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static newUser = async (req: Request, res: Response) => {
        console.log('newUserCalled')
        //Get parameters from the body
        let { email, password, name, surname, phone, bookmarks } = req.body;
        let user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        user.surname = surname;
        user.phone = phone;
        user.bookmarks = bookmarks || [];
        // @ts-ignore
        user.username = '';
        // user.role = role;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();
        //Try to save. If fails, the email is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user)
        } catch (e) {
            console.log(e);
            res.status(409).send("email already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("User created");
    };

    static editUser = async (req: Request, res: Response) => {
        console.log('editiiiiing')
        //Get the ID from the url
        const id = req.params.id;

        console.log('id: ', id)
        //Get values from the body
        const { email, bookmarks, role } = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.email = email;
        user.bookmarks = bookmarks
        // user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means email already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("email already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(200).send({bookmarks: user.bookmarks});
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default UserController;

// import {getMongoRepository, getRepository} from "typeorm";
// import {NextFunction, Request, Response} from "express";
// import {User} from "../entity/User";
//
// export class UserController {
//
//     private userRepository = getMongoRepository(User);
//
//     async all(request: Request, response: Response, next: NextFunction) {
//         if (Object.keys(request.query).length) {
//             return this.one(request, response, NextFunction)
//         }
//         return this.userRepository.find();
//     }
//
//     async one(request: Request, response: Response, next: NextFunction) {
//         console.log(request)
//         const {email} = request.query
//         return await this.userRepository.findOne({email: email})
//         // const res = this.userRepository.findOne({email: email})
//         // const token = 'sda'
//         // return {response: res, token: token};
//     }
//
//     async save(request: Request, response: Response, next: NextFunction) {
//         return this.userRepository.save(request.body);
//     }
//
//     async remove(request: Request, response: Response, next: NextFunction) {
//         let userToRemove = await this.userRepository.findOne(request.params.id);
//         await this.userRepository.remove(userToRemove);
//     }
//
//     async update(request: Request, response: Response, next: NextFunction) {
//         let id = request.body.id
//         let userToUpdate = request.body
//        return await this.userRepository.update(id, {bookmarks: userToUpdate.bookmarks});
//
//     }
//
//     async getUser(jwtid) {
//         console.log(request)
//         const {email} = request.query
//         return await this.userRepository.findOne({email: email})
//         // const res = this.userRepository.findOne({email: email})
//         // const token = 'sda'
//         // return {response: res, token: token};
//     }
// }
