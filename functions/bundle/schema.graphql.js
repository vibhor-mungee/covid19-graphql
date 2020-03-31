const typeDefs =
  `type Query {
  deaths: Death
  reports: Report
  ReportByCountry(country: String!): ReportByCountry
}

type Death {
  id: ID!
  deathCount: String!
  table: [DeathTable]
}

type DeathTable {
  id: ID!
  Date: String
  TotalDeaths: String
  ChangeInTotal: String
  ChangeTotalInPercent: String
}

type Report {
  id: ID!
  cases: String
  deaths: String
  recovered: String
  active_cases: [ActiveCases]
  closed_cases: [ClosedCases]
  table: [ReportTable]
}

type ReportByCountry {
  id: ID!
  country: [String]
  flag: String
  cases: String
  deaths: String
  recovered: String
  active_cases: [ActiveCases]
  closed_cases: [ClosedCases]
}

type ActiveCases {
  id: ID!
  currently_infected_patients: String
  inMidCondition: String
  criticalStates: String
}

type ClosedCases {
  id: ID!
  cases_which_had_an_outcome: String
  recovered: String
  deaths: String
}

type ReportTable {
  id: ID!
  TotalCases: String
  NewCases: String
  TotalDeaths: String
  NewDeaths: String
  TotalRecovered: String
  ActiveCases: String
  Deaths_1M_pop: String
  FirstCase: String
  Country: String
  Serious_Critical: String
  TotCases_1M_Pop: String
}`