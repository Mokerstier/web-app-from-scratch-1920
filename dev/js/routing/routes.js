import { routie } from './routie'

export const routes = {
    routie(':id', function(id) {
        console.log(id);
    });
}