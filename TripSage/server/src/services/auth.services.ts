import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/users/User";
import bcrypt from "bcrypt";
import { LoginUser } from "../controllers/controllerModels/login";
import { RegisterUser } from "../controllers/controllerModels/register";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthServices {
    constructor(private repo: UserRepository) { }

    async validateLoginUser(loginUser: LoginUser): Promise<boolean> {
        const users = await this.repo.find(" email = ?", [loginUser.email]);

        if (users.length === 1) {
            return await bcrypt.compare(loginUser.password, users[0].passwordHash);
        } else {
            return false;
        }
        
    }
    async registerUser(user: RegisterUser) {
        const newUser = new User;
        const salt = await bcrypt.genSalt(10);
        newUser.passwordHash = await bcrypt.hash(user.password, salt);
        newUser.firstName = user.name;
        newUser.lastName = user.lastname;
        newUser.email = user.email;

        await this.repo.insertOne(newUser);
    }

    async getUserId(email: string): Promise<number> {

        const users = await this.repo.find(" email = ?", [email]);

        return users[0].id;
}
    async getUserName(email: string): Promise<string> {
    const users = await this.repo.find(" email = ?", [email]);

    if (users.length > 0) {
        return users[0].firstName; 
    }

}
}
