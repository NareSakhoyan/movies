
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
// import routes from "./routes/index";
import routes from "./routes";
import auth from "./routes/auth";
import user from "./routes/user";

//Connects to the Database -> then starts the express
createConnection()
    .then(async connection => {
        // Create a new express application instance
        const app = express();
        const corsOptions = {
            oriqin: 'http://localhost:8080'
        }
        // Call midlewares
        // @ts-ignore
        app.use(cors(corsOptions));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        app.use(helmet());

        app.get('/', (req, res) => {
            res.json({message: 'Welcome'})
        })

        //Set all routes from routes folder
        app.use("/auth", auth);
        app.use("/user", user);

        app.listen(3000, () => {
            console.log("Server started on port 3000!");
        });
    })
    .catch(error => console.log(error));










// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import * as express from "express";
// import * as bodyParser from "body-parser";
// import * as cors from "cors";
// import {Request, Response} from "express";
// import {Routes} from "./routes/routes";
// const auth = require('./auth');
//
// createConnection().then(async connection => {
//
//     // create express app
//     const app = express();
//     const corsOptions = {
//         origin: 'http://localhost:8080'
//     }
//     app.use(cors(corsOptions))
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }))
//
//     // register express routes from defined application routes
//     Routes.forEach(route => {
//         (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//             const result = (new (route.controller as any))[route.action](req, res, next);
//             if (result instanceof Promise) {
//                 result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
//
//             } else if (result !== null && result !== undefined) {
//                 res.json(result);
//             }
//         });
//     });
//
//     app.use('/auth', auth);
//
//     // setup express app here
//     app.get('/', (req, res) => {
//         res.json({message: 'Welcome'})
//     })
//
//     // start express server
//     app.listen(3000);
//
//     console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
//
// }).catch(error => console.log(error));
