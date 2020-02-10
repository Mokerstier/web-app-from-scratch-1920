 // Create elements for the results
  export function addDataToElement(hero, index){
      // Create add to Team button
      const key = hero.name + index
      let addButton = document.createElement("button");
      addButton.setAttribute('data-key', key)
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

    //   container.addEventListener("click", function (e){
    //       const { target } = e
    //       const dataKey = target.getAttribute('data-key')

    //       console.log(dataKey)

    //       if (dataKey === key){
    //           myHeros.push(hero)
    //           console.log(myHeros)
    //           localStorage.setItem('myHeros', JSON.stringify(hero));
    //       }
    //   }) 
  }