(function () {
  'use strict';

  const userAPIKEY = `9f1dfce0c33d520203276ccf628a6c26`;
  const url =  `https://gateway.marvel.com/v1/public/characters`;
  const params = `limit=100&apikey=${userAPIKEY}`;
  let offsetVal = 0;


  async function apiCall() {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    return data
  }


  async function heroCall(id) {
    const response = await fetch(`${url}/${id}?${params}`);
    const data = await response.json();

    return data.data.results[0]
  }

  async function heroComics(id){
    const response = await fetch(`${url}/${id}/comics?${params}`);
    const data = await response.json();
    
    return data.data.results
  }

  function loadMore(){
    offsetVal+=100;
    if (offsetVal <= 1400){
      return new Promise((resolve, reject) => {
        const loader = document.querySelector('.loader2');
        loader.classList.remove('hide');
        fetch(`${url}?offset=${offsetVal}&${params}`)
        .then((res) => {
            resolve(res.json());
            loader.classList.add('hide');
        });
      })
    } else{
      const finalState = document.querySelector('h4');
      finalState.classList.remove('hide');
    }
    
  }

  function createElement(tag, { options, children }) {
      const element = document.createElement(tag);
      
      if (options.classNames) {
          options.classNames.forEach(className =>{
              element.classList.add(className);
          });
      }
      if (options.text) {
        element.innerText = options.text;
      }
      if (options.href){
          element.setAttribute('href', options.href);
      }
      if (options.src){
        element.setAttribute('src', options.src);
      }
      if (children){
        children.forEach(child => {
          element.appendChild(child);
        });
      }
      return element
    }

  function filterImg(heroes){
      return heroes.filter(hero => hero.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && hero.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708')
  }
  function filterDesc(heroes){
      return heroes.filter(hero => hero.description !== '')
  }

  function insertS(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }

  // Create elements for the results
    function HerosOverview(hero, index, element){
        // Create add to Team button
        element.classList.add('overview');
        const key = hero.name + index;
        //let heroLink = document.createElement("a")
        const heroThumb = hero.thumbnail;
        
        const nameTitle = createElement("p", {
          options: { text: hero.name }
        });

        const heroImg = createElement("img", {
          options: { src: insertS(`${heroThumb.path}`, 4, 's')+`.${heroThumb.extension}` }
        });

        const cardBody = createElement('div', {
          options: {classNames: ['card-body']},
          children: [nameTitle ]
        });
        
        const container = createElement('div', {
          options:{}, 
          children:[ heroImg, cardBody ]
        });

        const heroLink = createElement('a',{
          options: { href:`#${hero.id}` },
          children: [ container ]
        });
        //heroLink.href = `#${hero.id}`
        
        let addButton = document.createElement("button");
        
        addButton.classList.add('block');
        addButton.setAttribute('data-key', key);
        addButton.innerText = `Add ${hero.name} to the team`;
        element.appendChild(heroLink);

    }

    function heroDetail(hero, element){
      element.classList.remove('overview');
      
      
      const heroThumb = hero.thumbnail;
      insertS(`${heroThumb.path}`, 4, 's');

      const imgUrl = insertS(`${heroThumb.path}`, 4, 's')+`.${heroThumb.extension}`;
      const heroImg = createElement('img', { options: { src: imgUrl } });
      const heroTitle = createElement('h3', {options: {classNames: ['herotitle'], text: hero.name}});

      const heroDescription = createElement('p', {options: {
        text: hero.description || 'No description found'
      }});

      const heroDetailCard = createElement('article', {
        options: {classNames:['herodetail']}, 
        children: [heroImg, heroTitle, heroDescription]
      });
   


      element.appendChild(heroDetailCard);

      //This hero appears in the following comics
      heroComics(hero.id)
      
        .then( data =>{
          console.log(data);
          const filterdImg = filterImg(data);
          console.log(filterdImg);
          filterdImg.forEach(comic => {
            const imgUrl = `${comic.images[0].path}.${comic.images[0].extension}`;
            const comicImg = createElement('img',{
              options:{
                src: imgUrl || 'No img available'
              }
            });
            const comicTitle = createElement('p', {
              options: {
                text:  comic.title
              }
            });
            const comicCard = createElement('div',{
              options:{},
              children: [comicTitle, comicImg]
            });
            const comicContainer = createElement('section',{
              options:{
                classNames: ['comics']
              },
              children: [comicCard]
            });

            element.appendChild(comicContainer);
            
          });
          
        });
      
    }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var routie = createCommonjsModule(function (module) {
  /*!
   * routie - a tiny hash router
   * v0.3.2
   * http://projects.jga.me/routie
   * copyright Greg Allen 2016
   * MIT License
  */
  const Routie = function(w, isModule) {

      const routes = [];
      const map = {};
      const reference = "routie";
      const oldReference = w[reference];
    
      const Route = function(path, name) {
        this.name = name;
        this.path = path;
        this.keys = [];
        this.fns = [];
        this.params = {};
        this.regex = pathToRegexp(this.path, this.keys, false, false);
    
      };
    
      Route.prototype.addHandler = function(fn) {
        this.fns.push(fn);
      };
    
      Route.prototype.removeHandler = function(fn) {
        for (let i = 0, c = this.fns.length; i < c; i++) {
          const f = this.fns[i];
          if (fn == f) {
            this.fns.splice(i, 1);
            return;
          }
        }
      };
    
      Route.prototype.run = function(params) {
        for (let i = 0, c = this.fns.length; i < c; i++) {
          this.fns[i].apply(this, params);
        }
      };
    
      Route.prototype.match = function(path, params){
        const m = this.regex.exec(path);
    
        if (!m) return false;
    
    
        for (let i = 1, len = m.length; i < len; ++i) {
          const key = this.keys[i - 1];
    
          const val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];
    
          if (key) {
            this.params[key.name] = val;
          }
          params.push(val);
        }
    
        return true;
      };
    
      Route.prototype.toURL = function(params) {
        const path = this.path;
        for (const param in params) {
          path = path.replace('/:'+param, '/'+params[param]);
        }
        path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
        if (path.indexOf(':') != -1) {
          throw new Error('missing parameters for url: '+path);
        }
        return path;
      };
    
      const pathToRegexp = function(path, keys, sensitive, strict) {
        if (path instanceof RegExp) return path;
        if (path instanceof Array) path = '(' + path.join('|') + ')';
        path = path
          .concat(strict ? '' : '/?')
          .replace(/\/\(/g, '(?:/')
          .replace(/\+/g, '__plus__')
          .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
            keys.push({ name: key, optional: !! optional });
            slash = slash || '';
            return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
          })
          .replace(/([\/.])/g, '\\$1')
          .replace(/__plus__/g, '(.+)')
          .replace(/\*/g, '(.*)');
        return new RegExp('^' + path + '$', sensitive ? '' : 'i');
      };
    
      const addHandler = function(path, fn) {
        const s = path.split(' ');
        const name = (s.length == 2) ? s[0] : null;
        path = (s.length == 2) ? s[1] : s[0];
    
        if (!map[path]) {
          map[path] = new Route(path, name);
          routes.push(map[path]);
        }
        map[path].addHandler(fn);
      };
    
      const routie = function(path, fn) {
        if (typeof fn == 'function') {
          addHandler(path, fn);
          routie.reload();
        } else if (typeof path == 'object') {
          for (const p in path) {
            addHandler(p, path[p]);
          }
          routie.reload();
        } else if (typeof fn === 'undefined') {
          routie.navigate(path);
        }
      };
    
      routie.lookup = function(name, obj) {
        for (let i = 0, c = routes.length; i < c; i++) {
          const route = routes[i];
          if (route.name == name) {
            return route.toURL(obj);
          }
        }
      };
    
      routie.remove = function(path, fn) {
        const route = map[path];
        if (!route)
          return;
        route.removeHandler(fn);
      };
    
      routie.removeAll = function() {
        map = {};
        routes = [];
      };
    
      routie.navigate = function(path, options) {
        options = options || {};
        const silent = options.silent || false;
    
        if (silent) {
          removeListener();
        }
        setTimeout(function() {
          window.location.hash = path;
    
          if (silent) {
            setTimeout(function() { 
              addListener();
            }, 1);
          }
    
        }, 1);
      };
    
      routie.noConflict = function() {
        w[reference] = oldReference;
        return routie;
      };
    
      const getHash = function() {
        return window.location.hash.substring(1);
      };
    
      const checkRoute = function(hash, route) {
        const params = [];
        if (route.match(hash, params)) {
          route.run(params);
          return true;
        }
        return false;
      };
    
      const hashChanged = routie.reload = function() {
        const hash = getHash();
        for (let i = 0, c = routes.length; i < c; i++) {
          const route = routes[i];
          if (checkRoute(hash, route)) {
            return;
          }
        }
      };
    
      const addListener = function() {
        if (w.addEventListener) {
          w.addEventListener('hashchange', hashChanged, false);
        } else {
          w.attachEvent('onhashchange', hashChanged);
        }
      };
    
      const removeListener = function() {
        if (w.removeEventListener) {
          w.removeEventListener('hashchange', hashChanged);
        } else {
          w.detachEvent('onhashchange', hashChanged);
        }
      };
      addListener();
    
      if (isModule){
        return routie;
      } else {
        w[reference] = routie;
      }
       
    };
    
    {
      module.exports = Routie(window,true);
    }
  });

  const results = document.querySelector(".results");
  const loader = document.querySelector(".loading");
  const loadMoreButton = document.querySelector('.loadmore');
  const link = document.querySelectorAll("a");

  routie ({
      '': function() {
          loader.classList.toggle('hide');
          results.innerHTML = ''; // Clear the page!
          apiCall().then(heroData => {
             
              const filteredImg = filterImg(heroData.data.results);
              const filteredDesc = filterDesc(filteredImg);
              console.log(filteredDesc);
              loader.classList.toggle('hide');
              filteredDesc.forEach((hero, index) => {
                      
                      HerosOverview(hero, index,results);
              });   
          }); 
      },
      ':id': function(id) {
          results.innerHTML = '';
          
          heroCall(id)
          .then(data => {  
                     
              heroDetail(data, results);
          });
  	},
  	'about': function() {
  	}
  });
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
  }// Stole this scroll function from https://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom#9439807
  const scrollPage = debounce(function(ev) {
      if(window.location.hash === ''){
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

              loadMore().then(heroData =>{
                  console.log(heroData.data);
                  const filteredImg = filterImg(heroData.data.results);
                  const filteredDesc = filterDesc(filteredImg);
                  filteredDesc.forEach((hero, index) => {
                      HerosOverview(hero, index,results);
                      });
                  }); 
          }
      }
  }, 500);
  window.addEventListener('scroll', scrollPage);
  console.log(window.location.hash);
  // loadMoreButton.addEventListener('click', () => {
  //     loadMore().then(heroData =>{
  //     console.log(heroData.data)
  //     const filteredImg = filterImg(heroData.data.results)
  //     const filteredDesc = filterDesc(filteredImg)
  //     filteredDesc.forEach((hero, index) => {
  //         HerosOverview(hero, index,results)
  //         })
  //     })   
  // })

}());
