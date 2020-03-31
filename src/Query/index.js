const PluginManager = require('covid19-api');
const uuid = require('uuid/v4');

const Query = {
  deaths: async () => {
    const deaths = await PluginManager.getDeaths();
    const id = uuid();
    return { id, deathCount: deaths[0][0].deaths, table: deaths[0][0].table }
  },
  reports: async () => {
    const reports = await PluginManager.getReports();
    const id = uuid();
    return {
      id,
      ...reports[0][0],
      table: reports[0][0].table[0]
    }
  },
  ReportByCountry: async (parent, { country }, context) => {
    const reports = await PluginManager.getReportsByCountries([country]);
    const id = uuid();
    return {
      id,
      ...reports[0][0]
    }
  },
  fatalityRateByAge: async () => {
    const fatalityRate = await PluginManager.getFatalityRateByAge();
    const id = uuid();
    return { id, fatalityRate: fatalityRate[0] }
  },
  coronavirusHasSpread: async () => {
    const spread = await PluginManager.getCountriesWhereCoronavirusHasSpread();
    const id = uuid();
    return { id, hasSpread: spread[0] }
  },
  getGlobalDataWithCountry: async (parent, { country }, context) => {
    let countryData = [];
    for (let i = 0; i < country.length; i += 1) {
      const reports = await PluginManager.getReportsByCountries(country[i]);
      countryData = countryData.concat(reports[0]);
    }
    const reportData = await PluginManager.getReports();
    let report = reportData[0];
    const id = uuid();
    report = report.concat(countryData);
    return { id, data: report };
  }
}

module.exports = { Query }
// const fatalityRateByAge = await PluginManager.getFatalityRateByAge()
// const countriesWhereCoronavirusHasSpread = await PluginManager.getCountriesWhereCoronavirusHasSpread()