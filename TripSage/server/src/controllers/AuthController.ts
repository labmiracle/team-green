import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { UserRepository } from "../repositories/user.repository";
import { LoginUser } from "./controllerModels/login";
import { RegisterUser } from "./controllerModels/register";

@Path("/api/auth")
@Tags("Auth")
@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
    config: Configuration;

    constructor(config: ConfigurationBuilder, private repo: UserRepository) {
        super();
        this.config = config.build(Configuration);
    }

    @POST
    @Path("/login")
    @Action({ route: "/login", fromBody: true, method: HttpMethod.POST })
    async login(loginUser: LoginUser): Promise<boolean> {
        try {
            const users = await this.repo.find("email = ? AND password = ?", [loginUser.email, loginUser.password]);
    
            if (users.length === 1) {
                return true; // Inicio de sesión válido.
            } else {

                this.httpContext.response.status(401).send("Inicio de sesión no válido");
                return false; // Inicio de sesión no válido.
            }
        } catch {
 
            this.httpContext.response.status(500).send("Error interno del servidor");
            return false; // Error interno.
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
