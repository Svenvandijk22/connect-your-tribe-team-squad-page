# Squad Page
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid

**Beschrijving**

Sven:
Ik heb me bezig gehouden met de galerij ik en de functie dat je spelers kan selecteren. Eerst heb ik een loop gemaakt voor de img. For = loop door de lijst met personen f person.mugshot = check of die persoon een foto heeft met if els kan ik een voorbeeld foto erin zetten. Verder heb ik met de  parameters ingesteld om personen op te halen uit Directus. De personen worden alfabetisch gesorteerd op naam. Daarnaast worden alle gegevens van de persoon opgehaald.



Mouaad:
Ik heb een form gemaakt die ervoor zorgt dat de team naam verandert kan worden en dat heb kunnen doen door liquid en javascript:

~~~Liquid:

{% for teamchange in teamchanges reversed %}
  {% if forloop.index == 1 %}
  <p>{{ teamchange.text }} </p>
  {% else %}
            {% break %} <!-- De rest van de berichten na object 3 worden niet bekeken-->
        {% endif %}
{% endfor %}

 
 
<form  method="POST" action="/">
  <label>
    Team
    <input type="text" name="text" required>
  </label>
    <button type="submit">press</button>
</form>
~~~

~~~Javascript:

~~app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}


app.get('/', async function (request, response) {

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
~~~
