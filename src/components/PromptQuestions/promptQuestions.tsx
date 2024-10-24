export interface Question {
  id: string;
  question: string;
  options: string[];
  next?: {
    [key: string]: string;
    default?: string | any;
  };
}

export interface Scenario {
  question: string;
  questions: Question[];
}

export interface PromptQuestion {
  [key: string]: {
    scenarios: Scenario[];
  };
}

export const promptQuestion: PromptQuestion = {
  builder: {
    scenarios: [
      {
        question: "I WANT TO BUILD",
        questions: [
          {
            id: "already_have_lot",
            question: "DO YOU HAVE A LOT?",
            options: ["YES", "NO"],
            next: {
              YES: "yes",
              NO: "no",
            },
          },

          {
            id: "yes",
            question: "UNDERWRITE",
            options: [],
            next: {
              default: "location",
            },
          },

          {
            id: "location",
            question: "WHERE IS YOUR LOT LOCATED?",
            options: [],
            next: {
              default: "lot_size",
            },
          },

          {
            id: "lot_size",
            question: "WHAT IS THE SIZE OF YOUR LOT?",
            options: [],
            next: {
              default: "lot_cost",
            },
          },

          {
            id: "lot_cost",
            question: "WHAT IS THE COST OF YOUR LOT?",
            options: [],
            next: {
              default: "map",
            },
          },

          {
            id: "no",
            question: "SELECT A PROVINCE",
            options: [
              "Alberta",
              // "British Columbia",
              // "Manitoba",
              // "New Brunswick",
              // "Newfoundland and Labrador",
              // "Northwest Territories",
              // "Nova Scotia",
              // "Nunavut",
              // "Ontario",
              // "Prince Edward Island",
              // "Quebec",
              // "Saskatchewan",
              // "Yukon"
            ],
            next: {
              default: "select_city",
            },
          },

          {
            id: "select_city",
            question: "SELECT A CITY",
            options: [
              "Edmonton",
              "Calgary",
              "Strathcona County",
              "Sturgen County",
              "Parkland County",
              "Leduc County",
            ],
            next: {
              default: "what_to_build",
            },
          },

          {
            id: "what_to_build",
            question: "WHAT DO YOU WANT TO BUILD?",
            options: ["RESIDENTIAL", "COMMERCIAL"],
            next: {
              RESIDENTIAL: "kind_of_residential",
              COMMERCIAL: "kind_of_commercial",
            },
          },

          {
            id: "kind_of_commercial",
            question: "WHAT TYPE OF COMMERCIAL PROJECT?",
            options: [
              "MIXED USE",
              "RETAIL",
              "OFFICE",
              "HOSPITALITY",
              "INDUSTRIAL",
              "MULTI-FAMILY",
            ],
            next: {
              "MIXED USE": "where_to_build",
              OFFICE: "where_to_build",
              RETAIL: "where_to_build",
              HOSPITALITY: "where_to_build",
              INDUSTRIAL: "kind_of_industrial",
              "MULTI-FAMILY": "how_many_storeys",
            },
          },

          {
            id: "kind_of_industrial",
            question: "WHAT TYPE OF INDUSTRIAL PROJECT?",
            options: ["LIGHT", "HEAVY"],
            next: {
              default: "where_to_build",
            },
          },

          {
            id: "how_many_storeys",
            question: "HOW MANY STOREYS?",
            options: ["5", "6", "7", "8", "9", "10"],
            next: {
              default: "where_to_build",
            },
          },

          {
            id: "where_to_build",
            question: "WHERE DO YOU WANT TO BUILD?",
            options: ["CITY INFILL", "SUBURBS", "RURAL"],
            next: {
              default: "map",
            },
          },

          {
            id: "kind_of_residential",
            question: "WHAT TYPE OF RESIDENTIAL PROJECT?",
            options: ["LOW DENSITY", "MULTI-FAMILY"],
            next: {
              "MULTI-FAMILY": "storeys",
              "LOW DENSITY": "where_to_build",
            },
          },

          {
            id: "storeys",
            question: "HOW MANY STOREYS?",
            options: ["1", "2", "3", "4"],
            next: {
              default: "where_to_build",
            },
          },
        ],
      },
    ],
  },
};
