import { heroComics } from "./marvelCall"
import { createElement } from './template'

// Create elements for the results
  export function HerosOverview(hero, index, element){
      // Create add to Team button
      element.classList.add('overview')
      const key = hero.name + index
      let heroLink = document.createElement("a")
      
      heroLink.href = `#${hero.id}`
      let heroThumb = hero.thumbnail
      let addButton = document.createElement("button")
      
      addButton.classList.add('block')
      addButton.setAttribute('data-key', key)
      addButton.innerText = `Add ${hero.name} to the team`
      let cardBody = document.createElement('div')
      cardBody.classList.add('card-body')
      let container = document.createElement("div")

      // Create Hero nameTitle
      let nameTitle = document.createElement("p");
      nameTitle.innerText = hero.name;
      // Create Hero IMG
      let heroImage = document.createElement("img");
      if (heroThumb.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
        heroImage.classList.add('offset')
      }
      heroImage.src =  `${heroThumb.path}.${heroThumb.extension}`;

      container.appendChild(heroImage);
      cardBody.appendChild(nameTitle);
      cardBody.appendChild(addButton);
      container.appendChild(cardBody)
      heroLink.appendChild(container);
      element.appendChild(heroLink);

  }

  export function heroDetail(hero, element){
    element.classList.toggle('overview')
    
    let heroThumb = hero.thumbnail
    let imgUrl = `${heroThumb.path}.${heroThumb.extension}`
    let heroImg = createElement('img', { options: { src: imgUrl } })

    let heroDescription = createElement('p', {options: {
      text: hero.description || 'No description found'
    }})

    let heroDetailCard = createElement('article', {
      options: {}, 
      children: [heroImg, heroDescription]
    })
 


    element.appendChild(heroDetailCard)

    //This hero appears in the following comics
    heroComics(hero.id)
    
      .then( data =>{
        console.log(data)
        let comicContainer = document.createElement('section')
        comicContainer.classList.add("comics")
        data.forEach(comic => {
          let comicCard = document.createElement('div')
          let comicTitle = document.createElement('p')
          comicTitle.innerText = comic.title
          let comicImg = document.createElement('img')
          if (comic.images.length == 0){
            comicImg.alt = 'No img available'
          } else{
            comicImg.src = `${comic.images[0].path}.${comic.images[0].extension}`
          }
          

          comicCard.appendChild(comicTitle)
          comicCard.appendChild(comicImg)
          comicContainer.appendChild(comicCard)
          element.appendChild(comicContainer)
          
        });
        
      })
    
  }