import { heroComics } from "./marvelCall"
import { createElement } from './template'
import { filterImg } from "./data"

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
    element.classList.remove('overview')
    
    const heroThumb = hero.thumbnail
    const imgUrl = `${heroThumb.path}.${heroThumb.extension}`
    const heroImg = createElement('img', { options: { src: imgUrl } })
    const heroTitle = createElement('h3', {options: {classNames: ['herotitle'], text: hero.name}})

    const heroDescription = createElement('p', {options: {
      text: hero.description || 'No description found'
    }})

    const heroDetailCard = createElement('article', {
      options: {classNames:['herodetail']}, 
      children: [heroImg, heroTitle, heroDescription]
    })
 


    element.appendChild(heroDetailCard)

    //This hero appears in the following comics
    heroComics(hero.id)
    
      .then( data =>{
        console.log(data)
        const filterdImg = filterImg(data)
        console.log(filterdImg)
        filterdImg.forEach(comic => {
          const imgUrl = `${comic.images[0].path}.${comic.images[0].extension}`
          const comicImg = createElement('img',{
            options:{
              src: imgUrl || 'No img available'
            }
          })
          const comicTitle = createElement('p', {
            options: {
              text:  comic.title
            }
          })
          const comicCard = createElement('div',{
            options:{},
            children: [comicTitle, comicImg]
          })
          const comicContainer = createElement('section',{
            options:{
              classNames: ['comics']
            },
            children: [comicCard]
          })

          element.appendChild(comicContainer)
          
        });
        
      })
    
  }