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

export class SkyscannerApiClient {
    private readonly apiKey: string = `sh428739766321522266746152871799`;
    private readonly baseUrl: string = `https://partners.api.skyscanner.net/apiservices`;

    constructor() {
        this.apiKey = `sh428739766321522266746152871799`;
    }

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
                    const search = skyscannerApiClient.poll(response.data.sessionToken);
                    return search;
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

    public async poll(sessionToken: string) {
        try {
            const search = await axiosI
                .post(`/v3/flights/live/search/poll/${sessionToken}`, {
                    method: "post",
                    headers: {
                        "x-api-key": this.apiKey,
                    },
                })
                .then((response: any) => {
                    console.log("iujuuuuuuuuuuu", response.data);
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
/*
        const headers = {
            "x-api-key": this.apiKey,
            "Content-Type": "application/json",
        };
        const response = await fetch(`${this.baseUrl}/v3/flights/live/search/create`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(query),
        });

        if (!response.ok) {
            throw new Error(`Skyscanner API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
}


@Path("https://partners.api.skyscanner.net/apiservices")
@Tags("Users")
@Controller({ route: "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create" })
export class SearchController extends ApiController {
    constructor(private repo: Query) {
        super();
    }

    @POST
    @Response<string>(500, "Internal Server error")
    @Action({ route: "/v3/flights/live/search/create", method: HttpMethod.POST })


    async create() {
        try {
            
            this.httpContext.request.headers{
                `x-api-key`: `sh428739766321522266746152871799`,
                "Content-Type": "application/json"
            }

            this.httpContext.response.body =
            return data = await this.create.json();
            
*/
/*
            const request = {
                body: {
                    query: {
                        market: "UK",
                        locale: "en-GB",
                        currency: "GBP",
                        queryLegs: [
                            {
                                originPlaceId: {
                                    iata: "EDI", // The IATA code for the "Edinburgh" airport
                                },
                                destinationPlaceId: {
                                    entityId: "27544008", // The internal Skyscanner ID for the "London" city
                                },
                                date: {
                                    year: 2023,
                                    month: 9,
                                    day: 29,
                                },
                            },
                            {
                                originPlaceId: {
                                    entityId: "27544008",
                                },
                                destinationPlaceId: {
                                    iata: "EDI",
                                },
                                date: {
                                    year: 2022,
                                    month: 9,
                                    day: 30,
                                },
                            },
                        ],
                        adults: 1,
                        //               "childrenAges": [],
                        cabinClass: "CABIN_CLASS_ECONOMY",
                        //                 "excludedAgentsIds": [],
                        //                   "excludedCarriersIds": [],
                        //                     "includedAgentsIds": [],
                        //                       "includedCarriersIds": [],
                        includeSustainabilityData: false,
                        nearbyAirports: false,
                    },
                },
                headers: {
                    "x-api-key": "sh428739766321522266746152871799",
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch("https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create", {
                method: "POST",
                body: JSON.stringify(request.body),
                headers: request.headers,
            });

            const data = await response.json();

            return data;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
} */
