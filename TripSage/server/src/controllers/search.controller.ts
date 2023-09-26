import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { Path, PathParam, GET, POST, DELETE, PUT, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { InsertionResult } from "../core/repositories/commands/db.command";
import path from "path";
import { Headers } from "node-fetch";
import { Query } from "../models/Flight/query";
/*
curl --location --request POST 'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create' \
--header 'x-api-key: sh428739766321522266746152871799' \
--data-raw '...'
*/

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
            /*
            this.httpContext.request.headers({
                "x-api-key": "sh428739766321522266746152871799",
                "Content-Type": "application/json"
            })

            this.httpContext.response.body =
            return data = await this.create.json();
            */
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
                                    year: 2022,
                                    month: 9,
                                    day: 21,
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
}
