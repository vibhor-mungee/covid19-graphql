const PluginManager = require('covid19-api');
const uuid = require('uuid/v4');
const request = require('request');
const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


const getDateWiseReport = async () => {
  return await new Promise(resolve =>
    request({
      url: `https://pomber.github.io/covid19/timeseries.json`,
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    }, (e, r, body) => {
      if (!body) {
        return resolve([]);
      }

      return resolve(JSON.parse(body));
    }
    ));
};

const getCountryWiseNews = async (country) => {
  return await new Promise(resolve =>
    request({
      url: `https://newsapi.org/v2/top-headlines?apiKey=63749fa5401b47c38fc99a7efb35e65a&category=health&country=${country}&q=corona`,
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    }, (e, r, body) => {
      if (!body) {
        return resolve([]);
      }
      return resolve(JSON.parse(body));
    }
    ));
};

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
  },
  getDateWiseDataByCountry: async (parent, { country }, context) => {
    let countryName = "";
    if (country.toLowerCase().trim() === "south korea") {
      countryName = "Korea, South";
    } else if (country.toLowerCase().trim() === "uk") {
      countryName = "United Kingdom";
    } else if (country.toLowerCase().trim() === "us") {
      countryName = "US";
    } else {
      countryName = country.toLowerCase().trim().split(' ').map((item) => item.charAt(0).toUpperCase() + item.substring(1)).join(' ').trim();
    }
    const reportData = await getDateWiseReport();
    const id = uuid();
    return { id, data: reportData[countryName] };
  },
  getCountryNews: async (parent, { country }, context) => {
    let countryCode = countries.getAlpha2Code(country, 'en');
    let result = await getCountryWiseNews(countryCode);
    const id = uuid();
    return { id, news: result.articles };
  }
}

module.exports = { Query }
