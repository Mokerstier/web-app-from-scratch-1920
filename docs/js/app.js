(function () {
  'use strict';

  const userAPIKEY = `9f1dfce0c33d520203276ccf628a6c26`;
  const url =  `https://gateway.marvel.com/v1/public/characters`;
  const params = `limit=100&apikey=${userAPIKEY}`;
  let offsetVal = 0;


  // export function apiCall() {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${url}?${params}`)
  //     .then((res) => {
  //         resolve(res.json())
  //     })
  //   })
  // }

  async function apiCall() {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    return data
  }

  // export function heroCall(id) {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${url}/${id}?${params}`)
  //     .then((res) =>{
  //       return res.json()
  //     })
  //     .then(data => {
  //       console.log(data.data.results)
  //     })
  //   })
  // }

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
    return new Promise((resolve, reject) => {
      fetch(`${url}?offset=${offsetVal}&${params}`)
      .then((res) => {
          resolve(res.json());
      });
    })
  }

  function createElement(tag, { options, children }) {
      const element = document.createElement(tag);
      
      if (options.classNames) ;
      if (options.text) {
        element.innerText = options.text;
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

  // Create elements for the results
    function HerosOverview(hero, index, element){
        // Create add to Team button
        element.classList.add('overview');
        const key = hero.name + index;
        let heroLink = document.createElement("a");
        
        heroLink.href = `#${hero.id}`;
        let heroThumb = hero.thumbnail;
        let addButton = document.createElement("button");
        
        addButton.classList.add('block');
        addButton.setAttribute('data-key', key);
        addButton.innerText = `Add ${hero.name} to the team`;
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        let container = document.createElement("div");

        // Create Hero nameTitle
        let nameTitle = document.createElement("p");
        nameTitle.innerText = hero.name;
        // Create Hero IMG
        let heroImage = document.createElement("img");
        if (heroThumb.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
          heroImage.classList.add('offset');
        }
        heroImage.src =  `${heroThumb.path}.${heroThumb.extension}`;

        container.appendChild(heroImage);
        cardBody.appendChild(nameTitle);
        cardBody.appendChild(addButton);
        container.appendChild(cardBody);
        heroLink.appendChild(container);
        element.appendChild(heroLink);

    }

    function heroDetail(hero, element){
      element.classList.toggle('overview');
      
      let heroThumb = hero.thumbnail;
      let imgUrl = `${heroThumb.path}.${heroThumb.extension}`;
      let heroImg = createElement('img', { options: { src: imgUrl } });

      let heroDescription = createElement('p', {options: {
        text: hero.description || 'No description found'
      }});

      let heroDetailCard = createElement('article', {
        options: {}, 
        children: [heroImg, heroDescription]
      });
   


      element.appendChild(heroDetailCard);

      //This hero appears in the following comics
      heroComics(hero.id)
      
        .then( data =>{
          console.log(data);
          let comicContainer = document.createElement('section');
          comicContainer.classList.add("comics");
          data.forEach(comic => {
            let comicCard = document.createElement('div');
            let comicTitle = document.createElement('p');
            comicTitle.innerText = comic.title;
            let comicImg = document.createElement('img');
            if (comic.images.length == 0){
              comicImg.alt = 'No img available';
            } else{
              comicImg.src = `${comic.images[0].path}.${comic.images[0].extension}`;
            }
            

            comicCard.appendChild(comicTitle);
            comicCard.appendChild(comicImg);
            comicContainer.appendChild(comicCard);
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
  var Routie = function(w, isModule) {

      var routes = [];
      var map = {};
      var reference = "routie";
      var oldReference = w[reference];
    
      var Route = function(path, name) {
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
        for (var i = 0, c = this.fns.length; i < c; i++) {
          var f = this.fns[i];
          if (fn == f) {
            this.fns.splice(i, 1);
            return;
          }
        }
      };
    
      Route.prototype.run = function(params) {
        for (var i = 0, c = this.fns.length; i < c; i++) {
          this.fns[i].apply(this, params);
        }
      };
    
      Route.prototype.match = function(path, params){
        var m = this.regex.exec(path);
    
        if (!m) return false;
    
    
        for (var i = 1, len = m.length; i < len; ++i) {
          var key = this.keys[i - 1];
    
          var val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];
    
          if (key) {
            this.params[key.name] = val;
          }
          params.push(val);
        }
    
        return true;
      };
    
      Route.prototype.toURL = function(params) {
        var path = this.path;
        for (var param in params) {
          path = path.replace('/:'+param, '/'+params[param]);
        }
        path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
        if (path.indexOf(':') != -1) {
          throw new Error('missing parameters for url: '+path);
        }
        return path;
      };
    
      var pathToRegexp = function(path, keys, sensitive, strict) {
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
    
      var addHandler = function(path, fn) {
        var s = path.split(' ');
        var name = (s.length == 2) ? s[0] : null;
        path = (s.length == 2) ? s[1] : s[0];
    
        if (!map[path]) {
          map[path] = new Route(path, name);
          routes.push(map[path]);
        }
        map[path].addHandler(fn);
      };
    
      var routie = function(path, fn) {
        if (typeof fn == 'function') {
          addHandler(path, fn);
          routie.reload();
        } else if (typeof path == 'object') {
          for (var p in path) {
            addHandler(p, path[p]);
          }
          routie.reload();
        } else if (typeof fn === 'undefined') {
          routie.navigate(path);
        }
      };
    
      routie.lookup = function(name, obj) {
        for (var i = 0, c = routes.length; i < c; i++) {
          var route = routes[i];
          if (route.name == name) {
            return route.toURL(obj);
          }
        }
      };
    
      routie.remove = function(path, fn) {
        var route = map[path];
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
        var silent = options.silent || false;
    
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
    
      var getHash = function() {
        return window.location.hash.substring(1);
      };
    
      var checkRoute = function(hash, route) {
        var params = [];
        if (route.match(hash, params)) {
          route.run(params);
          return true;
        }
        return false;
      };
    
      var hashChanged = routie.reload = function() {
        var hash = getHash();
        for (var i = 0, c = routes.length; i < c; i++) {
          var route = routes[i];
          if (checkRoute(hash, route)) {
            return;
          }
        }
      };
    
      var addListener = function() {
        if (w.addEventListener) {
          w.addEventListener('hashchange', hashChanged, false);
        } else {
          w.attachEvent('onhashchange', hashChanged);
        }
      };
    
      var removeListener = function() {
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

  let inputField = document.getElementById("userInput");


  routie ({
      '': function() {
          loader.classList.toggle('hide');
          results.innerHTML = ''; // Clear the page!
          apiCall().then(heroData => {
              loader.classList.toggle('hide');
              heroData.data.results.forEach((hero, index) => {
                      
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

  //if (localStorage.getItem('page1') === null){

  // } else heroData1 = JSON.parse(localStorage.getItem('page1'))
      // console.log(heroData1)
  // .then(heroData => {
  //     heroData.forEach((hero, index) => {
  //         addDataToElement(hero, index, results)
  // }) 
  //}

  loadMoreButton.addEventListener('click', () => {
      loadMore().then(heroData =>{
      console.log(heroData.data);
      heroData.data.results.forEach((hero, index) => {
          HerosOverview(hero, index,results);
          });
      });   
  });
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
