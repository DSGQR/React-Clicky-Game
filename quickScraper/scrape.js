const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

axios.get('https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number')
  .then(r => {
    const $ = cheerio.load(r.data)
    $('tr').each((i, elem) => {
      $(elem).children('td').each((i, elem) => {
        if (i === 2) {
          const pokemon = `
          {
            "name": "${$(elem).children('a').children('img').attr('alt')}",
            "image": "https:${$(elem).children('a').children('img').attr('src')}"
          },
          `
          fs.appendFile('pokemon.json', pokemon, e => e ? console.error(e) : null)
        }
      })
    })
  })
  .catch(e => console.error(e))
