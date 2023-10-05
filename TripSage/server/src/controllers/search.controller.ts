import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { Path, PathParam, GET, POST, DELETE, PUT, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { InsertionResult } from "../core/repositories/commands/db.command";
import path from "path";
import { Headers } from "node-fetch";
import { IQuery } from "../models/Flight/query";
import { HttpHeaders } from "@miracledevs/paradigm-web-fetch";
import { Axios } from "axios";

const axios = require("axios");
const axiosI = axios.create({
    baseURL: `https://partners.api.skyscanner.net/apiservices`,
});

@Tags("Flights")
@Path("/flights")
@Controller({ route: "/flights" })
export class SkyscannerApiClient extends ApiController {
    private readonly apiKey: string = `sh428739766321522266746152871799`;
    private readonly baseUrl: string = `https://partners.api.skyscanner.net/apiservices`;

    constructor() {
        super();
    }

    @POST
    @Action({ route: "/search" })
    public async create(query: IQuery) {
        try {
            const response = await axiosI
                .post(`/v3/flights/live/search/create`, query, {
                    method: "post",
                    headers: {
                        "x-api-key": this.apiKey,
                    },
                    data: { query },
                })
                .then((response: any) => {
                    //response.json(response.data);
                    console.log(response.data);
                    //const search = SkyscannerApiClient.poll(response.data.sessionToken);
                    return response.data;
                });
        } catch (error) {
            if (error.response) {
                console.log("El error es:", error.response.data);
                console.log("El error es:", error.response.status);
                console.log("El error es:", error.response.headers);
                //response.status(500).json({ error: "Error en la llamada" });
            } else if (error.request) {
                // La petición fue hecha pero no se recibió respuesta
                // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
                // http.ClientRequest en node.js
                console.log(error.request);
            } else {
                // Algo paso al preparar la petición que lanzo un Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    @POST
    @Path("/search/:sessionToken")
    @Action({ route: "/search/:sessionToken" })
    public async poll(sessionToken: string) {
        try {
            axiosI.defaults.headers.common["x-api-key"] = this.apiKey;
            const search = await axiosI
                .post(`/v3/flights/live/search/poll/${sessionToken}`)
                /*, {
                    method: "post",
                    /*
                    headers: {
                        "x-api-key": this.apiKey,
                    },
                    */
                /*
                })*/
                .then((response: any) => {
                    console.log("Datos de vuelos:", response.data);
                    return response.data;
                });
        } catch (error) {
            if (error.response) {
                console.log("El error es:", error.response.data);
                console.log("El error es:", error.response.status);
                console.log("El error es:", error.response.headers);
                //response.status(500).json({ error: "Error en la llamada" });
            } else if (error.request) {
                // La petición fue hecha pero no se recibió respuesta
                // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
                // http.ClientRequest en node.js
                console.log(error.request);
            } else {
                // Algo paso al preparar la petición que lanzo un Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }
}

/*
const query: IQuery = {
    query: {
        market: "UK",
        locale: "en-GB",
        currency: "GBP",
        queryLegs: [
            {
                originPlaceId: {
                    iata: "LHR",
                },
                destinationPlaceId: {
                    iata: "EDI",
                },
                date: {
                    year: 2023,
                    month: 10,
                    day: 15,
                },
            },
        ],
        adults: 1,

        cabinClass: "CABIN_CLASS_ECONOMY",
    },
};
const skyscannerApiClient = new SkyscannerApiClient();

skyscannerApiClient
    .create(query)
    .then(response => {
        console.log("Response:", response);
    })
    .catch(error => {
        console.error("Error:", error);
    });
*/
