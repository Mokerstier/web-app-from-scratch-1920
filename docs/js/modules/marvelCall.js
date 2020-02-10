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