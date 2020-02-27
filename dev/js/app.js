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
	'myHeroes': function() {
        heroDetail(data, results)
	}
})
// stole the debounce function from https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
// Stole this scroll function from https://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom#9439807
const scrollPage = debounce(function(ev) {
    if(window.location.hash === ''){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

            loadMore().then(heroData =>{
                console.log(heroData.data)
                const filteredImg = filterImg(heroData.data.results)
                const filteredDesc = filterDesc(filteredImg)
                filteredDesc.forEach((hero, index) => {
                    HerosOverview(hero, index,results)
                    })
                }) 
        }
    }
}, 500);
window.addEventListener('scroll', scrollPage);

