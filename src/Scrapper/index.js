const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const request = require('request');
const tabletojson = require('tabletojson').Tabletojson;

const stateWiseData = async () => {
    const res = await cloudscraper(`https://www.mohfw.gov.in`, {
        method: 'GET',
    });
    const $ = cheerio.load(res);
    const html = $.html();
    const table = tabletojson.convert(html);
    const data = table[0];
    const tableData = [];
    for (let t = 0; t < data.length - 2; t += 1) {
        tableData.push({
            name: data[t]['Name of State / UT'],
            confirmed: data[t]['Total Confirmed cases (Including 65 foreign Nationals)'],
            death: data[t]['Death'],
            recovered: data[t]['Cured/Discharged/Migrated']
        })
    }
    return tableData;
}

module.exports = { stateWiseData };