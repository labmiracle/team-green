import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

export interface IQuery {
    query: {
        market: string;
        locale: string;
        currency: string;
        queryLegs: [
            {
                originPlaceId: {
                    iata: string;
                    entityId?: string;
                };
                destinationPlaceId: {
                    iata: string;
                    entityId?: string;
                };
                date: {
                    year: number;
                    month: number;
                    day: number;
                };
            }
        ];
        cabinClass?: "CABIN_CLASS_UNSPECIFIED" | "CABIN_CLASS_ECONOMY" | "CABIN_CLASS_PREMIUM_ECONOMY" | "CABIN_CLASS_BUSINESS" | "CABIN_CLASS_FIRST";
        adults: number;
        childrenAges?: [number];
        includedCarriersIds?: [string];
        excludedCarriersIds?: [string];
        includedAgentsIds?: [string];
        excludedAgentsIds?: [string];
        includeSustainabilityData?: true;
        nearbyAirports?: true;
    };
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class Query implements IQuery {
    query: {
        market: "string";
        locale: "string";
        currency: "string";
        queryLegs: [
            {
                originPlaceId: {
                    iata: "string";
                    entityId: "string";
                };
                destinationPlaceId: {
                    iata: "string";
                    entityId: "string";
                };
                date: {
                    year: 0;
                    month: 0;
                    day: 0;
                };
            }
        ];
        cabinClass: "CABIN_CLASS_UNSPECIFIED";
        adults: 0;
        childrenAges: [0];
        includedCarriersIds: ["string"];
        excludedCarriersIds: ["string"];
        includedAgentsIds: ["string"];
        excludedAgentsIds: ["string"];
        includeSustainabilityData: true;
        nearbyAirports: true;
    };
}
