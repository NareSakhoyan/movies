import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import AuthController from "../controllers/AuthController";
import {User} from "../entity/User";

const router = Router();

//Get all users
router.get("/",  UserController.listAll);
// router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

//getbytoken
router.get("/me", [checkJwt], UserController.getOneById);


// Get one user
router.get(
    "/:id",
    [checkJwt],
    // [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
);

//Create a new user
router.post("/", UserController.newUser);
// router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

//Edit one user
router.put(
    "/:id",
    [checkJwt],
    // [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
);

//Delete one user
router.delete(
    "/:id",
    [checkJwt],
    // [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
);

export default router;