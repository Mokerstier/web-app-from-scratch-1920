var request = new XMLHttpRequest()

request.open('GET', 'https://superheroapi.com/api/3212926708736175/search/ironman', true)
request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    console.log(data)
    
  }
  
  request.send()