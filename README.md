# Web App From Scratch @cmda-minor-web 1819
Creating a superHero web app that displays Hero's and their abillity's all rendered client side! Using the Marvel-API from https://gateway.marvel.com

## Concept
In this web-App users can assemble a team of superheros to their personal liking.
 features I want to implement:
 - Comparing Hero's
 - Adding Hero's to a team
 - Visualize team stats
 - Add suggestions to improve current team

## Actor Diagram
 1 Purpose of the app
    - An app that lets users compile a team of superhero's to their personal liking
 2 Functionalities within the app
    -[x] App conects to Marvel-API
    -[x] App requests data and stores the result
    -[x] App generates HTML to visualize the data from the API
    -[ ] User can assemble a team of hero's from the generated pages and store them local
    -[ ] Routing to detail or personal pages

 ![Actor Diagram](https://github.com/Mokerstier/web-app-from-scratch-1920/blob/dev/diagrams/ActorDiagram.png)
### Interaction Diagram
![Interaction Diagram](https://github.com/Mokerstier/web-app-from-scratch-1920/blob/dev/diagrams/InteractionDiagram.png)

### API information 🐒
- Get a key!
    You can aquire a API key from marvel if you navigate to https://developer.marvel.com/account
- Key restrictions
    - Rate limits are set to 3000 requests a day
- Attribution
    - Every page within the app or web pages that display data from the API must add the following text: "Data provided by Marvel. © 2014 Marvel"
- Endpoints
  - Marvel API has a lot of endpoints available based on 7 subjecst:
    1. Comics
    2. Comic series
    3. Comic stories
    4. Comic events and crossovers
    6. Creators
    7. Characters
   - for more information on these subjects https://developer.marvel.com/documentation/generalinfo
  - possible enpoints will look like this`/v1/public/characters`, `/v1/public/characters/{characterId}` & `/v1/public/characters/{characterId}/comics`
  - For a full list and data objects returned for each endpoint check https://developer.marvel.com/docs

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
