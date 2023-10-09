import { Action, ApiController, ConfigurationBuilder , Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/users/User";
import { UserRepository } from "../repositories/user.repository";
import { Path, PathParam, GET, POST } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { InsertionResult } from "../core/repositories/commands/db.command";
import jwt from "jsonwebtoken";
import { AuthServices } from "../services/auth.services";
import { loginUser } from "../models/authuser/login"
import { Configuration } from "../configuration/configuration";

@Path("/api/users")
@Tags("Users")
@Controller({ route: "/api/users" })
export class UserController extends ApiController {
    config: Configuration;
    constructor(config: ConfigurationBuilder, private repo: UserRepository, private service: AuthServices) {
        super();
        this.config = config.build(Configuration)
    }

    @GET
    @Response<string>(500, "Internal Server error")
    @Action({ route: "/" })
    async getAll(): Promise<User[]> {
        try {
            const users = await this.repo.getAll();
            console.log(users);
            return users;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return [];
        }
    }

    @GET
    @Response<string>(404, "User not found")
    @Path(":id")
    @Action({ route: "/:id" })
    async getOne(@PathParam("id") id: number): Promise<User> {
        try {
            return this.repo.getById(id);
        } catch (error) {
            this.httpContext.response.sendStatus(400);
            return;
        }
    }

    @POST
    @Response<User>(201, "User created")
    @Response<string>(500, "Internal server error")
    @Action({ route: "/register", fromBody: true })
    async post(user: User): Promise<User> {
        try {
            const metadata: InsertionResult<number> = await this.repo.insertOne(user);
            user.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return user;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
/*
    @POST
    @Path("/login")
    @Action({ route: "/login", fromBody: true, method: HttpMethod.POST })
    async login(loginUser: loginUser): Promise<void> {
        try {
            console.log(loginUser)
            const valid = await this.service.validateLoginUser(loginUser);
            console.log(valid)
            if (valid) {
                const token = jwt.sign({ email: loginUser.email, passwordHash: loginUser.passwordHash }, this.config.jwtSecret);
    
                // Configura el encabezado de autorización
                this.httpContext.response.setHeader("Authorization", `Bearer ${token}`);

                console.log(loginUser)
                // Devuelve el token en el cuerpo de la respuesta JSON
                this.httpContext.response.status(200).json({ token });
            } else {
                // Si el usuario no es válido, devuelve un estado 401 (No autorizado)
                this.httpContext.response.sendStatus(401);
            }
        } catch {
            // Si ocurre una excepción, devuelve un estado 500 (Error interno del servidor)
            this.httpContext.response.sendStatus(500);
        }
    }
*/
}
