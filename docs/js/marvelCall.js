let userAPIKEY = 'e404d856d55d8e5eb86955e2242939618199e291'
let url =  `https://cors-anywhere.herokuapp.com/https://gateway.marvel.com//v1/public/characters/?apikey=${userAPIKEY}`
 
fetch(url)

    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      loader.classList.toggle("hide")
      heroApiData = myJson;
      results.append(`${heroApiData} results found on your request`)
      // while (results.firstChild) results.removeChild(results.firstChild);
      // empties the results so when new request is done result won't stack
      // heroApiData.results.forEach((hero, index) => {
      //     addDataElement(hero, index);
      // });

    }); 
 