import { apiCall } from './modules/marvelCall'
import { loadMore } from './modules/marvelCall'
import { heroCall } from './modules/marvelCall'
import { HerosOverview } from './modules/render'
import { heroDetail } from './modules/render'
import {filterImg, filterDesc} from './modules/data'
import Routie from './routing/routie'

const results = document.querySelector(".results")
const loader = document.querySelector(".loading")
const loadMoreButton = document.querySelector('.loadmore')
const link = document.querySelectorAll("a")

Routie ({
    '': function() {
        loader.classList.toggle('hide')
        results.innerHTML = '' // Clear the page!
        apiCall().then(heroData => {
           
            const filteredImg = filterImg(heroData.data.results)
            const filteredDesc = filterDesc(filteredImg)
            console.log(filteredDesc)
            loader.classList.toggle('hide')
            filteredDesc.forEach((hero, index) => {
                    
                    HerosOverview(hero, index,results)
            })   
        }) 
    },
    ':id': function(id) {
        results.innerHTML = ''
        
        heroCall(id)
        .then(data => {  
                   
            heroDetail(data, results)
        })
	},
	'about': function() {
	}
})


loadMoreButton.addEventListener('click', () => {
    loadMore().then(heroData =>{
    console.log(heroData.data)
    heroData.data.results.forEach((hero, index) => {
        HerosOverview(hero, index,results)
        })
    })   
})
