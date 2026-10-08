// Original CCPA request choices and state values.
export const PRIVACY_REQUEST_OPTIONS = [
  {
    value: "unsubscribe",
    label: "Unsubscribe me from future marketing communications",
  },
  {
    value: "categories",
    label:
      "Provide the categories of personal information about me that the business collects and uses",
  },
  {
    value: "selling",
    label: "Does the business sell my personal information?",
  },
  {
    value: "specific",
    label:
      "Provide the specific personal information the business has about me",
  },
  {
    value: "delete_specific",
    label:
      "Delete specific data (You should specify in the text message field below)",
  },
  {
    value: "delete_all",
    label: "Delete all of my personal information",
  },
] as const;

export const PRIVACY_REQUEST_STATES = [
  {
    value: "AL",
    label: "Alabama",
  },
  {
    value: "AK",
    label: "Alaska",
  },
  {
    value: "AZ",
    label: "Arizona",
  },
  {
    value: "AR",
    label: "Arkansas",
  },
  {
    value: "CA",
    label: "California",
  },
  {
    value: "CO",
    label: "Colorado",
  },
  {
    value: "CT",
    label: "Connecticut",
  },
  {
    value: "DE",
    label: "Delaware",
  },
  {
    value: "FL",
    label: "Florida",
  },
  {
    value: "GA",
    label: "Georgia",
  },
  {
    value: "HI",
    label: "Hawaii",
  },
  {
    value: "ID",
    label: "Idaho",
  },
  {
    value: "IL",
    label: "Illinois",
  },
  {
    value: "IN",
    label: "Indiana",
  },
  {
    value: "IA",
    label: "Iowa",
  },
  {
    value: "KS",
    label: "Kansas",
  },
  {
    value: "KY",
    label: "Kentucky",
  },
  {
    value: "LA",
    label: "Louisiana",
  },
  {
    value: "ME",
    label: "Maine",
  },
  {
    value: "MD",
    label: "Maryland",
  },
  {
    value: "MA",
    label: "Massachusetts",
  },
  {
    value: "MI",
    label: "Michigan",
  },
  {
    value: "MN",
    label: "Minnesota",
  },
  {
    value: "MS",
    label: "Mississippi",
  },
  {
    value: "MO",
    label: "Missouri",
  },
  {
    value: "MT",
    label: "Montana",
  },
  {
    value: "NE",
    label: "Nebraska",
  },
  {
    value: "NV",
    label: "Nevada",
  },
  {
    value: "NH",
    label: "New Hampshire",
  },
  {
    value: "NJ",
    label: "New Jersey",
  },
  {
    value: "NM",
    label: "New Mexico",
  },
  {
    value: "NY",
    label: "New York",
  },
  {
    value: "NC",
    label: "North Carolina",
  },
  {
    value: "ND",
    label: "North Dakota",
  },
  {
    value: "OH",
    label: "Ohio",
  },
  {
    value: "OK",
    label: "Oklahoma",
  },
  {
    value: "OR",
    label: "Oregon",
  },
  {
    value: "PA",
    label: "Pennsylvania",
  },
  {
    value: "RI",
    label: "Rhode Island",
  },
  {
    value: "SC",
    label: "South Carolina",
  },
  {
    value: "SD",
    label: "South Dakota",
  },
  {
    value: "TN",
    label: "Tennessee",
  },
  {
    value: "TX",
    label: "Texas",
  },
  {
    value: "UT",
    label: "Utah",
  },
  {
    value: "VT",
    label: "Vermont",
  },
  {
    value: "VA",
    label: "Virginia",
  },
  {
    value: "WA",
    label: "Washington",
  },
  {
    value: "WV",
    label: "West Virginia",
  },
  {
    value: "WI",
    label: "Wisconsin",
  },
  {
    value: "WY",
    label: "Wyoming",
  },
] as const;

export const PRIVACY_CONTACT = "support@spotter.ai";
