export type StatePrice = { state: string; code: string; price: number };

export const PRICING_CAPTURE_DATE = "2026-10-08";
export const PRICING_SOURCE = "https://spotter.ai/mvr-pricing";
export const MVR_PRICES: readonly StatePrice[] = [
  {
    state: "Alaska",
    code: "AK",
    price: 15.25,
  },
  {
    state: "Alabama",
    code: "AL",
    price: 13,
  },
  {
    state: "Arkansas",
    code: "AR",
    price: 17.95,
  },
  {
    state: "Arizona",
    code: "AZ",
    price: 11.25,
  },
  {
    state: "California",
    code: "CA",
    price: 7.25,
  },
  {
    state: "Colorado",
    code: "CO",
    price: 14.25,
  },
  {
    state: "Connecticut",
    code: "CT",
    price: 23.25,
  },
  {
    state: "District of Columbia",
    code: "DC",
    price: 18.25,
  },
  {
    state: "Delaware",
    code: "DE",
    price: 30.25,
  },
  {
    state: "Florida",
    code: "FL",
    price: 13.27,
  },
  {
    state: "Georgia",
    code: "GA",
    price: 9,
  },
  {
    state: "Hawaii",
    code: "HI",
    price: 28.25,
  },
  {
    state: "Iowa",
    code: "IA",
    price: 15.55,
  },
  {
    state: "Idaho",
    code: "ID",
    price: 15.25,
  },
  {
    state: "Illinois",
    code: "IL",
    price: 25.25,
  },
  {
    state: "Indiana",
    code: "IN",
    price: 15.25,
  },
  {
    state: "Kansas",
    code: "KS",
    price: 21.95,
  },
  {
    state: "Kentucky",
    code: "KY",
    price: 11.25,
  },
  {
    state: "Louisiana",
    code: "LA",
    price: 23.25,
  },
  {
    state: "Massachusetts",
    code: "MA",
    price: 13.25,
  },
  {
    state: "Maryland",
    code: "MD",
    price: 20.25,
  },
  {
    state: "Maine",
    code: "ME",
    price: 12.25,
  },
  {
    state: "Michigan",
    code: "MI",
    price: 20.25,
  },
  {
    state: "Minnesota",
    code: "MN",
    price: 10.25,
  },
  {
    state: "Missouri",
    code: "MO",
    price: 5,
  },
  {
    state: "Mississippi",
    code: "MS",
    price: 19.25,
  },
  {
    state: "Montana",
    code: "MT",
    price: 13.12,
  },
  {
    state: "North Carolina",
    code: "NC",
    price: 18,
  },
  {
    state: "North Dakota",
    code: "ND",
    price: 8.25,
  },
  {
    state: "Nebraska",
    code: "NE",
    price: 20.25,
  },
  {
    state: "New Hampshire",
    code: "NH",
    price: 22.25,
  },
  {
    state: "New Jersey",
    code: "NJ",
    price: 18.25,
  },
  {
    state: "New Mexico",
    code: "NM",
    price: 11.75,
  },
  {
    state: "Nevada",
    code: "NV",
    price: 12.25,
  },
  {
    state: "New York",
    code: "NY",
    price: 12.25,
  },
  {
    state: "Ohio",
    code: "OH",
    price: 9,
  },
  {
    state: "Oklahoma",
    code: "OK",
    price: 32.75,
  },
  {
    state: "Oregon",
    code: "OR",
    price: 19.54,
  },
  {
    state: "Pennsylvania",
    code: "PA",
    price: 22.25,
  },
  {
    state: "Rhode Island",
    code: "RI",
    price: 26.25,
  },
  {
    state: "South Carolina",
    code: "SC",
    price: 12.25,
  },
  {
    state: "South Dakota",
    code: "SD",
    price: 12.25,
  },
  {
    state: "Tennessee",
    code: "TN",
    price: 12.75,
  },
  {
    state: "Texas",
    code: "TX",
    price: 11.75,
  },
  {
    state: "Utah",
    code: "UT",
    price: 15,
  },
  {
    state: "Virginia",
    code: "VA",
    price: 11,
  },
  {
    state: "Vermont",
    code: "VT",
    price: 25,
  },
  {
    state: "Washington",
    code: "WA",
    price: 17,
  },
  {
    state: "Wisconsin",
    code: "WI",
    price: 13.25,
  },
  {
    state: "West Virginia",
    code: "WV",
    price: 17.75,
  },
  {
    state: "Wyoming",
    code: "WY",
    price: 15.25,
  },
];

export const NATIONWIDE_SERVICES = [
  { name: "CDLIS", price: 4.5 },
  { name: "PSP", price: 10 },
  { name: "Driver Reviews", price: 3 },
  { name: "Drug Testing", price: 90 },
] as const;
