import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { Path, PathParam, POST } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";

import { IQuery } from "../models/Flight/query";
import { Flight } from "../models/Flight/Flight";

const axios = require("axios");
const axiosI = axios.create({
    baseURL: `https://partners.api.skyscanner.net/apiservices`,
});

@Tags("flights")
@Path("/api/flights")
@Controller({ route: "/api/flights" })
export class SkyscannerApiClient extends ApiController {
    private readonly apiKey: string = `sh428739766321522266746152871799`;
    private readonly baseUrl: string = `https://partners.api.skyscanner.net/apiservices`;

    constructor() {
        super();
    }

    @POST
    @Response<string>(500, "Internal Server error")
    @Action({ route: "/", fromBody: true, method: HttpMethod.POST })
    public async postcreate(query: IQuery): Promise<Flight> {
        try {
            console.log("este es el query adentro de postcreate: ", query);
            const response = await axiosI
                .post(`/v3/flights/live/search/create`, query, {
                    method: "POST",
                    headers: {
                        "x-api-key": "sh428739766321522266746152871799",
                    },
                })
                .then((response: any) => {
                    const data = response.data;

                    return this.httpContext.response.json(data);
                });
        } catch (error) {
            if (error.response) {
                console.log("El error es:", error.response.data);
                console.log("El error es:", error.response.status);
                console.log("El error es:", error.response.headers);
                this.httpContext.response.sendStatus(500);
                return;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    @POST
    @Path("/search/:sessionToken")
    @Action({ route: "/search/:sessionToken", method: HttpMethod.POST })
    public async poll(@PathParam("sessionToken") sessionToken: string) {
        try {
            axiosI.defaults.headers.common["x-api-key"] = this.apiKey;
            const search = await axiosI
                .post(`/v3/flights/live/search/poll/${sessionToken}`)

                .then((response: any) => {
                    console.log("Datos de vuelos:", response.data);
                    const data = response.data;
                    return this.httpContext.response.json(data);
                });
        } catch (error) {
            if (error.response) {
                console.log("El error es:", error.response.data);
                console.log("El error es:", error.response.status);
                console.log("El error es:", error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }
}

