import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'Jolly';


const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))




app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}

// app.get('/', async function (request, response) {
//   const params = {
//     // fields: 'name,mugshot,squads.*',
//     // 'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
//     // 'filter[squads][squad_id][name]': '1I',
//     // 'filter[squads][squad_id][cohort]': '2526',

//     'sort': 'name',
//     'fields': '*,squads.*',
//     'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
//     'filter[squads][squad_id][cohort]': '2526'
//   }

//   const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

//   const personResponseJSON = await personResponse.json()
//   console.log(personResponse)

//   response.render('index.liquid', { persons: personResponseJSON.data })
// })


app.get('/', async function (request, response) {
  const personParams = {
    // fields: 'name,mugshot,squads.*',
    // 'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // 'filter[squads][squad_id][name]': '1I',
    // 'filter[squads][squad_id][cohort]': '2526',

    'sort': 'name',
    'fields': '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }

  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(personParams))

  const personResponseJSON = await personResponse.json()

  // Filter eerst de berichten die je wilt zien, net als bij personen
  // Deze tabel wordt gedeeld door iedereen, dus verzin zelf een handig filter,
  // bijvoorbeeld je teamnaam, je projectnaam, je person ID, de datum van vandaag, etc..
  const params = {
    'filter[for]': `Team ${teamName}`,
  }

  // Maak hiermee de URL aan, zoals we dat ook in de browser deden
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(params)

  // Laat eventueel zien wat de filter URL is
  // (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
  // console.log('API URL voor messages:', apiURL)

  // Haal daarna de messages data op
  const teamchangeResponse = await fetch(apiURL)

  // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
  const teamchangesResponseJSON = await teamchangeResponse.json()

  // Controleer eventueel de data in je console
  // console.log(messagesResponseJSON)

  // En render de view met de messages
  response.render('index.liquid', {
    teamName: teamName,
    teamchanges: teamchangesResponseJSON.data,
    persons: personResponseJSON.data,
    
  })
})

app.post('/', async function (request, response) {

  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch('https://fdnd.directus.app/items/messages', {

    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: 'POST',

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: `Team ${teamName}`,
      // En dit zijn onze formuliervelden
      from: request.body.from,
      text: request.body.text
    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Stuur de browser daarna weer naar de homepage
  response.redirect(303, '/')
})







app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}


app.get('/za', async function (request, response) {
 
  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': '-name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))
 
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()
 
  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)
 
  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data})
})

