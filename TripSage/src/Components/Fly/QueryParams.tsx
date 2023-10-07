function QueryParams() {
  const queries = [
    {
      market: "US",
      locale: "en-US",
      currency: "USD",
      queryLegs: [
        {
          originPlaceId: {
            iata: "JFK",
          },
          destinationPlaceId: {
            iata: "LAX",
          },
          date: {
            year: 2023,
            month: 11,
            day: 15,
          },
        },
      ],
      adults: 2,
      cabinClass: "CABIN_CLASS_ECONOMY",
    },
    {
      market: "UK",
      locale: "en-GB",
      currency: "GBP",
      queryLegs: [
        {
          originPlaceId: {
            iata: "LHR",
          },
          destinationPlaceId: {
            iata: "CDG",
          },
          date: {
            year: 2023,
            month: 11,
            day: 20,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_PREMIUM_ECONOMY",
    },
    {
      market: "AR",
      locale: "es-ES",
      currency: "ARS",
      queryLegs: [
        {
          originPlaceId: {
            iata: "EZE",
          },
          destinationPlaceId: {
            iata: "MAD",
          },
          date: {
            year: 2023,
            month: 11,
            day: 2,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_PREMIUM_ECONOMY",
    },
    {
      market: "FR",
      locale: "fr-FR",
      currency: "EUR",
      queryLegs: [
        {
          originPlaceId: {
            iata: "CDG",
          },
          destinationPlaceId: {
            iata: "FRA",
          },
          date: {
            year: 2023,
            month: 11,
            day: 25,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_ECONOMY",
    },
    {
      market: "DE",
      locale: "de-DE",
      currency: "EUR",
      queryLegs: [
        {
          originPlaceId: {
            iata: "MUC",
          },
          destinationPlaceId: {
            iata: "JFK",
          },
          date: {
            year: 2023,
            month: 11,
            day: 18,
          },
        },
      ],
      adults: 2,
      cabinClass: "CABIN_CLASS_PREMIUM_ECONOMY",
    },
    {
      market: "ES",
      locale: "es-ES",
      currency: "EUR",
      queryLegs: [
        {
          originPlaceId: {
            iata: "BCN",
          },
          destinationPlaceId: {
            iata: "MIA",
          },
          date: {
            year: 2023,
            month: 11,
            day: 10,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_ECONOMY",
    },
    {
      market: "IT",
      locale: "it-IT",
      currency: "EUR",
      queryLegs: [
        {
          originPlaceId: {
            iata: "FCO",
          },
          destinationPlaceId: {
            iata: "ATH",
          },
          date: {
            year: 2023,
            month: 11,
            day: 5,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_ECONOMY",
    },
    {
      market: "AU",
      locale: "en-AU",
      currency: "AUD",
      queryLegs: [
        {
          originPlaceId: {
            iata: "SYD",
          },
          destinationPlaceId: {
            iata: "AKL",
          },
          date: {
            year: 2023,
            month: 11,
            day: 22,
          },
        },
      ],
      adults: 2,
      cabinClass: "CABIN_CLASS_PREMIUM_ECONOMY",
    },
    {
      market: "CA",
      locale: "en-CA",
      currency: "CAD",
      queryLegs: [
        {
          originPlaceId: {
            iata: "YYZ",
          },
          destinationPlaceId: {
            iata: "YVR",
          },
          date: {
            year: 2023,
            month: 11,
            day: 17,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_ECONOMY",
    },
    {
      market: "JP",
      locale: "ja-JP",
      currency: "JPY",
      queryLegs: [
        {
          originPlaceId: {
            iata: "HND",
          },
          destinationPlaceId: {
            iata: "ICN",
          },
          date: {
            year: 2023,
            month: 11,
            day: 12,
          },
        },
      ],
      adults: 1,
      cabinClass: "CABIN_CLASS_ECONOMY",
    },
  ];

  return queries;
}

export default QueryParams;
