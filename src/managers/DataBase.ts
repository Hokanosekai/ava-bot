import {Logger} from "../utils";
import {Connection, createConnection, Repository} from "typeorm";
import {User} from "../database/entities";
import BDDConfigJSON from '../config/ormconfig.json';

export class DataBase {

    private _userRepository: Repository<User>;

    constructor() {

        // @ts-ignore
        createConnection(BDDConfigJSON).then(connection => {

            this._userRepository = connection.getRepository(User);

            Logger.success('Successfully connected to MySQL');
        }).catch(e => {
            Logger.error(e);
        });
    }

    get users(): Repository<User> {
        return this._userRepository;
    }
}
