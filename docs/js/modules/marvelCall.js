let userAPIKEY = `9f1dfce0c33d520203276ccf628a6c26`
let url =  `https://gateway.marvel.com/v1/public/characters`
const params = `?apikey=${userAPIKEY}`

export function apiCall() {
  fetch(`${url}${params}`)
    .then((res) => {
        console.log(res)
        return res.json()
    })
    .then((myJson) => {
        console.log(myJson.data.results)
    })
  }