import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { User } from "../models/users/User";
import { MySqlConnection } from "../core/mysql/mysql.connection";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class UserRepository extends EditRepositoryBase<User> {
    constructor(dependecyContainer: DependencyContainer, connection: MySqlConnection) {
        super(dependecyContainer, connection, User, "user");
    }
}

