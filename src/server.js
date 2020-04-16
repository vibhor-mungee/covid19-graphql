
const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');
const Query = require('./Query');
const typeDefs =
  `type Query {
  deaths: Death
  reports: Report
  ReportByCountry(country: String!): ReportByCountry
  fatalityRateByAge: fatalityRateByAge
  coronavirusHasSpread: coronavirusHasSpread
  getGlobalDataWithCountry(country: [String]): getGlobalDataWithCountry
  getDateWiseDataByCountry(country: String): getDateWiseDataByCountry
  getCountryNews(country: String): getCountryNews
  getStateWiseRecordOfIndia: getStateWiseRecordOfIndia
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
}

type fatalityRate {
  Age: String
  DeathRateConfirmedCases: String
  DeathRateAllCases: String 
}

type fatalityRateByAge {
  id: ID!
  fatalityRate: [fatalityRate]
}

type hasSpread {
  Country: String
  Cases: String
  Deaths: String
  Region: String 
}

type coronavirusHasSpread{
  id: ID!
  hasSpread: [hasSpread]
}
type getData {
  country: String
  cases: String
  deaths: String
  recovered: String
}

type getGlobalDataWithCountry{
  id: ID!
  data: [getData]
}

type dateWiseData{
  date: String
  confirmed: String
  deaths: String
  recovered: String
}

type getDateWiseDataByCountry{
  id: ID!
  data: [dateWiseData]
}

type getCountryNews {
  id: ID!
  news: [news]
}

type news {
  title: String
  description: String
  url: String
  urlToImage: String
  publishedAt: String
  content: String
}

type getStateWiseRecordOfIndia {
  id: ID!
  state: [stateData]
}

type stateData {
  name: String
  confirmed: String
  death: String
  recovered: String
}
`

const resolvers = {
  ...Query
};

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer }