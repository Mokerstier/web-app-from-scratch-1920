import { heroComics } from "./marvelCall"
import { createElement } from './template'
import { filterImg } from "./data"

function insertS(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

// Create elements for the results
  export function HerosOverview(hero, index, element){
      // Create add to Team button
      element.classList.add('overview')
      const key = hero.name + index
      //let heroLink = document.createElement("a")
      const heroThumb = hero.thumbnail
      
      const nameTitle = createElement("p", {
        options: { text: hero.name }
      })

      const heroImg = createElement("img", {
        options: { src: insertS(`${heroThumb.path}`, 4, 's')+`.${heroThumb.extension}` }
      })

      const cardBody = createElement('div', {
        options: {classNames: ['card-body']},
        children: [nameTitle ]
      })
      
      const container = createElement('div', {
        options:{}, 
        children:[ heroImg, cardBody ]
      })

      const heroLink = createElement('a',{
        options: { href:`#${hero.id}` },
        children: [ container ]
      })
      //heroLink.href = `#${hero.id}`
      
      let addButton = document.createElement("button")
      
      addButton.classList.add('block')
      addButton.setAttribute('data-key', key)
      addButton.innerText = `Add ${hero.name} to the team`
      element.appendChild(heroLink)

  }

  export function heroDetail(hero, element){
    element.classList.remove('overview')
    
    
    const heroThumb = hero.thumbnail
    insertS(`${heroThumb.path}`, 4, 's')

    const imgUrl = insertS(`${heroThumb.path}`, 4, 's')+`.${heroThumb.extension}`
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