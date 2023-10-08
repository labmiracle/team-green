import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { UserRepository } from "../repositories/user.repository";
import { LoginUser } from "./controllerModels/login";
import { RegisterUser } from "./controllerModels/register";
import jwt from "jsonwebtoken"
import { AuthServices } from "../services/auth.services";

@Path("/api/auth")
@Tags("Auth")
@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
    config: Configuration;

    constructor(config: ConfigurationBuilder, private repo: UserRepository, private service: AuthServices) {
        super();
        this.config = config.build(Configuration);
    }

    @POST
    @Path("/login")
    @Action({ route: "/login", fromBody: true, method: HttpMethod.POST })
    async login(loginUser: LoginUser): Promise<string | undefined> {
        try {
            const valid = await this.service.validateLoginUser(loginUser);
    
            if (valid) {
                const userId = await this.service.getUserId(loginUser.email);
                const name = await this.service.getUserName(loginUser.email);

                const token = jwt.sign({ email: loginUser.email, id: userId, name : name }, this.config.jwtSecret);
                return token;
            }

            // if user not valid return 401
            this.httpContext.response.sendStatus(401);
        } catch {
            this.httpContext.response.sendStatus(500);

            return;
        }
    }



    @POST
    @Path("/register")
    @Action({ route: "/register", fromBody: true, method: HttpMethod.POST })
    async register(registerUser: RegisterUser): Promise<void> {
        try {
            const users = await this.repo.find("email = ?", [registerUser.email]);

            if (users.length !== 0) {
                this.httpContext.response.status(409).send("Email already registered");
            } else {
                const newUser = {
                    name: registerUser.name,
                    lastname: registerUser.lastname,
                    mail: registerUser.email,
                    password: registerUser.password,
                };


                this.httpContext.response.sendStatus(201); // Usuario registrado con éxito
            }
        } catch {
            this.httpContext.response.sendStatus(500); // Error interno del servidor
        }
    }
}
