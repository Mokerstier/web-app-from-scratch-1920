const userAPIKEY = `9f1dfce0c33d520203276ccf628a6c26`
const url =  `https://gateway.marvel.com/v1/public/characters?`
const params = `apikey=${userAPIKEY}`
let offsetVal = 0;


export function apiCall() {
  return new Promise((resolve, reject) => {
    fetch(`${url}${params}`)
    .then((res) => {
        resolve(res.json())
    })
  })
}
export function loadMore(){
  offsetVal+=20
  return new Promise((resolve, reject) => {
    fetch(`${url}offset=${offsetVal}&${params}`)
    .then((res) => {
        resolve(res.json())
    })
  })
}

