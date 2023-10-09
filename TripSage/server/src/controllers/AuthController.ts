import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { UserRepository } from "../repositories/user.repository";
import { loginUser } from "../models/authuser/login";
import { RegisterUser } from "./controllerModels/register";
import jwt from "jsonwebtoken"
import { AuthServices } from "../services/auth.services";

const options = {
  expiresIn: '1h', // Optional: Set an expiration time for the token (e.g., 1 hour)
};
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
    async login(loginUser: loginUser): Promise<boolean> {
        try {
            console.log(loginUser)
            const valid = await this.service.validateLoginUser(loginUser);
            console.log(valid)
            if (valid) {
                const token = jwt.sign( loginUser, this.config.jwtSecret, options);
    
                // Configura el encabezado de autorización
                this.httpContext.response.setHeader("Authorization", `Bearer ${token}`);
                
                console.log(token)
                // Devuelve el token en el cuerpo de la respuesta JSON
                this.httpContext.response.status(200).json({ token });
                return true
            } else { 
                // Si el usuario no es válido, devuelve un estado 401 (No autorizado)
                this.httpContext.response.sendStatus(401);
            }
        } catch {
            // Si ocurre una excepción, devuelve un estado 500 (Error interno del servidor)
            this.httpContext.response.sendStatus(500);
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
