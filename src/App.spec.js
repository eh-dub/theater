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

test("After the first beat, the three products should have ranks", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  expect(button.textContent).toBe("Put it in the data base!");

  await fireEvent.click(button);

  expect(button.textContent).toBe("Constant time insertion!")

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(3);

  const ranks = container.querySelectorAll(".product-rank");
  expect(ranks.length).toBe(3);
});

test("After the second beat, a 4th product is inserted", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  await fireEvent.click(button);
  await fireEvent.click(button);
  expect(button.textContent).toBe("Constant time insertion?");

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(4);

  const ranks = container.querySelectorAll(".product-rank");
  expect(ranks.length).toBe(4);
});

test("After the third beat, a 5th product is inserted", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);
  expect(button.textContent).toBe("What is the time complexity of fixing this?");

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(5);

  const ranks = container.querySelectorAll(".product-rank");
  expect(ranks.length).toBe(5);
});

test("After the third beat, a 5th product is inserted", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);
  expect(button.textContent).toBe("What is the time complexity of fixing this?");

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(5);

  const ranks = container.querySelectorAll(".product-rank");
  expect(ranks.length).toBe(5);
});

test("Between the third and fourth beats, all but the first product have their ranks incremented by one", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);

  let thirdBeatRanks = Array.from(container.querySelectorAll(".product-rank"))
                        .map(node => +node.textContent);

  await fireEvent.click(button);
  expect(button.textContent).toBe("Oh no :(");

  const ranks = container.querySelectorAll(".product-rank");
  let fourthBeatRanks = Array.from(ranks)
                        .map(node => +node.textContent);

  expect(thirdBeatRanks.length).toBe(fourthBeatRanks.length);
  expect(thirdBeatRanks[0]).toBe(fourthBeatRanks[0]);
  fourthBeatRanks.slice(1).forEach((fbr, i) => {
    expect(fbr).toBe(thirdBeatRanks[i+1]);
  })

});

test("The 7th beat adds a sixth product", async () => {
  const products = [{id: 5}, {id: 9}, {id: 1}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);
  await fireEvent.click(button);

  expect(button.textContent).toBe("Oh no :(");

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(6);

});