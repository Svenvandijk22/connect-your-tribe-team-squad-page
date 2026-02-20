
## Inhoudsopgave
  * [Beschrijving](#beschrijving)
## Beschrijving
Wij hebben een fifa-thema squadpage gemaakt waarin je mensen van squad I en J kan selecteren in een team. Ook kan je op onze website een eigen team naam maken.

### Sven
Ik heb me bezig gehouden met de galerij ik en de functie dat je spelers kan selecteren. Eerst heb ik een loop gemaakt voor de img. For = loop door de lijst met personen f person.mugshot = check of die persoon een foto heeft met if els kan ik een voorbeeld foto erin zetten. Verder heb ik met de  parameters ingesteld om personen op te halen uit Directus. De personen worden alfabetisch gesorteerd op naam. Daarnaast worden alle gegevens van de persoon opgehaald. 


#### galerij
de bedoeling van de galerij is om spelers te kunnen selecteren 

<img width="1823" height="593" alt="Schermopname (198)" src="https://github.com/user-attachments/assets/3bc598be-78af-4eae-8bff-e5f3b5b191ce" />

Deze JavaScript code zorgt ervoor dat spelers uit de galerij toegevoegd kunnen worden aan het team.Wanneer de pagina geladen is, kijkt de code naar alle spelerkaarten (.fifa-kaart).Elke kaart wordt klikbaar gemaakt. Als je op een speler klikt:



### Mouaad:
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
### Oumaima
Ik heb me bezig gehouden met de styling en css. We hebben gekozen om de squadpage na te maken van FIFA bij de spelersselectie. Er is gekozen voor een grid om de teams en de img van het voetbalveld uit elkaar te kunnen houden. OP de section .upperlayout  zit grid-template-columns( 1fr 60% 1fr). Op de buitenste twee zitten containers met een fractie en het middelste met procenten voor het voetbalveld. Er is ook voor gekozen om met custom properties te werken voor de kleuren en de font-sizing.

