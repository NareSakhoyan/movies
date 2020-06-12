import {createConnection, Connection} from 'typeorm'
import config from "./dbconfig";

const connection: Connection = await createConnection(config)
