// TODO
//  figure out how to test the actual script
//  right now jest complans about the import of the store. a script could accept it as an arg. 
//  this will require some rewriting of the script logic
//  do I agree with, "only svelte components should import stores"? gut says yes


import App from './App.svelte';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import { script } from './script';
// const { script } = require('./script.js');
// if one could auto generate this file from the script.... nirvana
// can you write a unit test like: "I don't want it to look retro". and then you train a neural net on retro looks.
// if you trip it, then it gives you a specific, actionable, and justified piece of feedback to look more modern/contemporary


test("no product ranks before first click", () => {
  const { container } = render(App, {props: {} });

  const ranks = container.querySelectorAll(".product-rank");
 
  expect(ranks.length).toBe(0);
})
test("3 product ranks after the first click", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);
  await fireEvent.click(button);

  expect(button.textContent).toBe("Constant time insertion!")

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(3);

  const ranks = container.querySelectorAll(".product-rank");
  expect(ranks.length).toBe(3);
});
