import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

interface IPricingOptions {
    price: {
        amount: string;
        unit: string;
        updateStatus: string;
    };
    agentIds: string[];
    items: IPricingOptions[];
    deepLink: string;
    fares?: {
        segmentId?: string;
        bookingCode?: string;
        fareBasisCode?: string;
    }[];
    transferType: string;
    id: string;
    pricingOptionFare?: null | string;
}

interface IItineraries {
    pricingOptions: IPricingOptions[];
    legIds: string[];
    sustainabilityData: null | string;
}

interface ILeg {
    originPlaceId: string;
    destinationPlaceId: string;
    departureDateTime: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    arrivalDateTime: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    durationInMinutes: number;
    stopCount?: number;
    marketingFlightNumber?: string;
    marketingCarrierIds: string[];
    operatingCarrierIds: string[];
    segmentIds?: string[];
}
export interface IPlaces {
    entityId: string;
    parentId: string;
    name: string;
    type: string;
    iata: string;
    coordinate: null | string | number;
}

export interface ICarriers {
    name: string;
    allianceId: string;
    imageUrl: string;
    iata: string;
    icao: string;
    displayCode: string;
}

export interface IAgents {
    name: string;
    type: string;
    imageUrl: string;
    feedbackCount: number;
    rating: string;
    ratingBreakdown: null | number | string;
    isOptimisedForMobile: boolean;
}

export interface IStats {
    itineraries?: {
        minDuration?: number;
        maxDuration?: number;
        total?: {
            count?: number;
            minPrice?: {
                amount?: string;
                unit?: string;
                updateStatus?: string;
            };
        };
        stops?: {
            direct?: {
                total?: {
                    count?: number;
                    minPrice?: {
                        amount?: string;
                        unit?: string;
                        updateStatus?: string;
                    };
                };
                ticketTypes?: {
                    singleTicket?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                    multiTicketNonNpt?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                    multiTicketNpt?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                };
            };
            oneStop?: {
                total?: {
                    count?: number;
                    minPrice?: {
                        amount?: string;
                        unit?: string;
                        updateStatus?: string;
                    };
                };
                ticketTypes?: {
                    singleTicket?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                    multiTicketNonNpt?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                    multiTicketNpt?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                };
            };
            twoPlusStops?: {
                total?: {
                    count?: number;
                    minPrice?: {
                        amount?: string;
                        unit?: string;
                        updateStatus?: string;
                    };
                };
                ticketTypes?: {
                    singleTicket?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                    multiTicketNonNpt?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                    multiTicketNpt?: {
                        count?: number;
                        minPrice?: {
                            amount?: string;
                            unit?: string;
                            updateStatus?: string;
                        };
                    };
                };
            };
        };
        hasChangeAirportTransfer?: boolean;
    };
}

export interface ISortingOptions {
    score: number;
    itineraryId: string;
}

export interface IFlight {
    sessionToken: string;
    status: string;
    action: string;
    content: {
        results: {
            itineraries: { [key: string]: IItineraries };
            legs: { [key: string]: ILeg };
            segments: { [key: string]: ILeg };
            places: { [key: string]: IPlaces };
            carriers: { [key: string]: ICarriers };
            agents: { [key: string]: IAgents };
            alliances: {
                [key: string]: {
                    name: string;
                };
            };
        };
    };
    stats: { itineraries: IStats };
    sortingOptions: {
        best: ISortingOptions[];
        cheapest: ISortingOptions[];
        fastest: ISortingOptions[];
    };
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class Flight implements IFlight {
    sessionToken: string;
    status: string;
    action: string;
    content: {
        results: {
            itineraries: { [key: string]: IItineraries };
            legs: { [key: string]: ILeg };
            segments: { [key: string]: ILeg };
            places: { [key: string]: IPlaces };
            carriers: { [key: string]: ICarriers };
            agents: { [key: string]: IAgents };
            alliances: {
                [key: string]: {
                    name: string;
                };
            };
        };
    };
    stats: { itineraries: IStats };
    sortingOptions: {
        best: ISortingOptions[];
        cheapest: ISortingOptions[];
        fastest: ISortingOptions[];
    };
}
