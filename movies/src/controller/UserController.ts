import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        if (Object.keys(request.query).length) {
            return this.one(request, response, NextFunction)
        }
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const {email} = request.query
        return this.userRepository.findOne({email: email});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}
