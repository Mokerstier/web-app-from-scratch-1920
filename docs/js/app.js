(function () {
  'use strict';

  const userAPIKEY = `9f1dfce0c33d520203276ccf628a6c26`;
  const url =  `https://gateway.marvel.com/v1/public/characters`;
  const params = `?apikey=${userAPIKEY}`;

  function apiCall() {
    return new Promise((resolve, reject) => {
      fetch(`${url}${params}`)
      .then((res) => {
          resolve(res.json());
      });
    })
  }

  // Create elements for the results
    function addDataToElement(hero, index){
        // Create add to Team button
        const key = hero.name + index;
        let addButton = document.createElement("button");
        addButton.setAttribute('data-key', key);
        addButton.innerText = `Add ${hero.name} to the team`;

        let container = document.createElement("div");
        // Create Hero nameTitle
        let nameTitle = document.createElement("h3");
        nameTitle.innerText = hero.name;
        // Create Hero IMG
        let heroImage = document.createElement("img");
        heroImage.src =  hero.thumbnail.path;

        results.appendChild(container);
        container.appendChild(nameTitle);
        container.appendChild(heroImage);
        container.appendChild(addButton);

        container.addEventListener("click", function (e){
            const { target } = e;
            const dataKey = target.getAttribute('data-key');

            console.log(dataKey);

            if (dataKey === key){
                myHeros.push(hero);
                console.log(myHeros);
                localStorage.setItem('myHeros', JSON.stringify(hero));
            }
        }); 
    }

  const results$1 = document.querySelector(".results");
  const loader = document.querySelector(".loading");

  let inputField = document.getElementById("userInput");


  apiCall().then(heroData => {
      console.log('this is the data: '+heroData);
  });
  addDataToElement(heroData);

  // fetch(`${url}${params}`)
  //     .then((res) => {
  //         console.log(res)
  //         return res.json()
  //     })
  //     .then((myJson) => {
  //         console.log(myJson.data.results)
  //     })
  // fetch(`https://gateway.marvel.com/v1/public/characters?${userAPIKEY}`)
      
  //     // loader.classList.toggle("hide")
  //     // console.log(response)
  //     .then((response) => {
  //         return response.json()
  //     })
  //     .then((response) => {
  //         console.log(response.data.results)
  //     })
      // .then((myJson) => {
      //   loader.classList.toggle("hide")
      //   heroApiData = myJson;
      //   results.append(`${heroApiData} results found on your request`)
      //   // while (results.firstChild) results.removeChild(results.firstChild);
      //   // empties the results so when new request is done result won't stack
      //   // heroApiData.results.forEach((hero, index) => {
      //   //     addDataElement(hero, index);
      //   // });

      // }); 

  // Als de user klaar is met typen haal de data op uit de API
  // function doneTyping (){
  //     userInput = inputField.value;
  //     loader.classList.toggle("hide");
  //     fetch(url+userInput)

  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((myJson) => {
  //       loader.classList.toggle("hide")
  //       heroApiData = myJson;
  //       results.append(`${heroApiData.results.length} results found on your request`)
  //       while (results.firstChild) results.removeChild(results.firstChild);
  //       // empties the results so when new request is done result won't stack
  //       heroApiData.results.forEach((hero, index) => {
  //           addDataElement(hero, index);
  //       });

  //     }); 
  // }

  // // Create elements for the results
  // function addDataElement(hero, index){
  //     // Create add to Team button
  //     const key = hero.name + index

  //     let addButton = document.createElement("button");
  //     addButton.setAttribute('data-key', key)
  //     addButton.innerText = `Add ${hero.name} to the team`;

  //     let container = document.createElement("div");
  //     // Create Hero nameTitle
  //     let nameTitle = document.createElement("h3");
  //     nameTitle.innerText = hero.name;
  //     // Create Hero IMG
  //     let heroImage = document.createElement("img");
  //     heroImage.src =  hero.image.url;

  //     results.appendChild(container);
  //     container.appendChild(nameTitle);
  //     container.appendChild(heroImage);
  //     container.appendChild(addButton);

  //     container.addEventListener("click", function (e){
  //         const { target } = e
  //         const dataKey = target.getAttribute('data-key')

  //         console.log(dataKey)

  //         if (dataKey === key){
  //             myHeros.push(hero)
  //             console.log(myHeros)
  //             localStorage.setItem('myHeros', JSON.stringify(hero));
  //         }
  //     }) 
  // }

  // inputField.addEventListener("keyup", function(e) {
  //     // Gebruik een setTimeout om delay te creeeren zodat de API call pas gemaakt wordt als de gebruiker 1 sec niet meer typt.
  //     clearTimeout(timeout);

  //     // Make a new timeout set to go off in 1000ms (1 second)
  //     timeout = setTimeout(function () {
  //         console.log('Input Value:', inputField.value);
  //         doneTyping();
  //     }, 1000);
  // })

}());
