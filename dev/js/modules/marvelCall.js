import { Resolver } from "dns"

const userAPIKEY = `9f1dfce0c33d520203276ccf628a6c26`
const url =  `https://gateway.marvel.com/v1/public/characters`
const params = `?apikey=${userAPIKEY}`

export function apiCall() {
  return new Promise((resolve, reject) => {
    fetch(`${url}${params}`)
    .then((res) => {
        console.log(res)
        resolve(res.json())
    })
  })
}