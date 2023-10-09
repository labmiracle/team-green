import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { UserRepository } from "../repositories/user.repository";
import { loginUser } from "../models/authuser/login";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthServices {
    constructor(private repo: UserRepository) { }

    async validateLoginUser(loginUser: loginUser): Promise<boolean> {
        try {
        const users = await this.repo.find("email = ?",  [loginUser.email]);
        console.log(users)
        console.log(loginUser)
        if (loginUser.passwordHash == users[0].passwordHash){
        return true
        }else return false;
    }
 catch (error) {
    if (error.response) {
        console.log("El error es:", error.response.data);
        console.log("El error es:", error.response.status);
        console.log("El error es:", error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log("Error", error.message);
    }
    console.log(error.config);
}}

}
