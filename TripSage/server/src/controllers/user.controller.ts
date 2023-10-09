import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/users/User";
import { UserRepository } from "../repositories/user.repository";
import { Path, PathParam, GET, POST, DELETE, PUT, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { InsertionResult } from "../core/repositories/commands/db.command";

@Path("/api/users")
@Tags("Users")
@Controller({ route: "/api/users" })
export class UserController extends ApiController {
    constructor(private repo: UserRepository) {
        super();
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
}
