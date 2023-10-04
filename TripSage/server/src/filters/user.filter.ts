import { Injectable, DependencyLifeTime } from "@miracledevs/paradigm-web-di";
import { IFilter, HttpContext } from "@miracledevs/paradigm-express-webapi";
import { UserRepository } from "../repositories/user.repository";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class UserFilter implements IFilter {
    constructor(private readonly userRepository: UserRepository) {}

    async beforeExecute(httpContext: HttpContext): Promise<void> {
        try {
    
            const email = httpContext.request.body.email;
            const password = httpContext.request.body.password;

            
            const users = await this.userRepository.find("email = ? AND password = ?", [email, password]);

            if (users.length === 1) {
                 
                httpContext.response.locals.user = users[0];
            } else {
                httpContext.response.sendStatus(401); // No autorizado
            }
        } catch (error) {
            httpContext.response.sendStatus(500); // Error
        }
    }

    async afterExecute(): Promise<void> {
      
    }

    async onError() {
       
    }
}
