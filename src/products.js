import { writable } from 'svelte/store';

export const products = writable([ {id: 1}
                                 , {id: 5}
                                 , {id: 9}
]);
