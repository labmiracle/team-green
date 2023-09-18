import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

export interface IFlight {
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

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class Flight implements IFlight {
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
