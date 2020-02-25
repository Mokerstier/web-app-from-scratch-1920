export function filterImg(heroes){
    return heroes.filter(hero => hero.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && hero.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708')
}
export function filterDesc(heroes){
    return heroes.filter(hero => hero.description !== '')
}
// console.log( hero.filter(filterImg))