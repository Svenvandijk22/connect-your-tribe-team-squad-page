import express from 'express'
import { AssignTag, Liquid } from 'liquidjs'

const teamName = 'Jolly'
const app = express()

// Static files uit /public
app.use(express.static('public'))

// Liquid
const engine = new Liquid()
app.engine('liquid', engine.express())
app.set('views', './views')
app.set('view engine', 'liquid')

// Form parsing
app.use(express.urlencoded({ extended: true }))

// Homepage
app.get('/', async function (request, response) {
  const personParams = {
    sort: 'name',
    fields: '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch(
    'https://fdnd.directus.app/items/person/?' + new URLSearchParams(personParams)
  )
  const personResponseJSON = await personResponse.json()

 
  const messageParams = {
    'filter[for]': `Team ${teamName}`,
  }
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(messageParams)
  const teamchangeResponse = await fetch(apiURL)
  const teamchangesResponseJSON = await teamchangeResponse.json()

    const ourTeamResponse = await fetch(
    'https://fdnd.directus.app/items/person/?filter[team]=' + teamName
  )
    const ourTeamResponseJSON = await ourTeamResponse.json()

  response.render('index.liquid', {
    teamName,
    ourTeamMembers: ourTeamResponseJSON.data,
    teamchanges: teamchangesResponseJSON.data,
    persons: personResponseJSON.data,
  })
})

// app.get('/', async function (request, response) {
//   const params = {
//     sort: 'name',
//     fields: '*,squads.*',
//     'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
//     'filter[squads][squad_id][cohort]': '2526'
//   }

//   const api = 'fdnd.directus.app/items/person/?' + new URLSearchParams(params)
//   const teamNames = await fetch(apiURL)
//   const teamNamesResponseJSON = await teamchangeResponse.json()

//   response.render('index.liquid', {
//     teamNames: teamNamesResponseJSON
//   })
// })

// Sort Z-A
app.get('/za', async function (request, response) {
  const personParams = {
    sort: '-name',
    fields: '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }

  const personResponse = await fetch(
    'https://fdnd.directus.app/items/person/?' + new URLSearchParams(personParams)
  )
  const personResponseJSON = await personResponse.json()

  const messageParams = {
    'filter[for]': `Team ${teamName}`,
  }

  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(messageParams)
  const teamchangeResponse = await fetch(apiURL)
  const teamchangesResponseJSON = await teamchangeResponse.json()

  response.render('index.liquid', {
    teamName,
    teamchanges: teamchangesResponseJSON.data,
    persons: personResponseJSON.data,
  })
})

// POST teamnaam opslaan
app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })

  response.redirect(303, '/')
})

// Start server (1x)
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), () => {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
