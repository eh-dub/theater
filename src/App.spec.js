// TODO
// - test the exact rankings expected at each stage
// - read about thunks and decide if that's what I'm talking about


import App from './App.svelte';
import { render, fireEvent, wait, waitForElement } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import { script } from './script';

// if one could auto generate this file from the script.... nirvana
// can you write a unit test like: "I don't want it to look retro". and then you train a neural net on retro looks.
// if you trip it, then it gives you a specific, actionable, and justified piece of feedback to look more modern/contemporary

test("no product ranks before first click", () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(3)

  const ranks = container.querySelectorAll(".product-rank");
 
  expect(ranks.length).toBe(0);
})

test("After the first beat, the three products should have ranks", async () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
  const productStore = writable(products);
  const { container } = render(App, {props: { products: productStore
                                            , script
                                            }
                                    });
                                                        
  const button = container.getElementsByTagName('button').item(0);

  expect(button.textContent).toBe("Put it in the data base!");

  await fireEvent.click(button);

  expect(button.textContent).toBe("Constant time insertion!")

  const rowNodes = container.querySelectorAll(".product-row");
  expect(rowNodes.length).toBe(3);
  
  const productIds = Array.from(container.querySelectorAll(".product-id"))
                       .map(node => +node.textContent) ;
  expect(productIds).toStrictEqual([1,5,9]);

  const rankNodes = container.querySelectorAll(".product-rank");
  expect(rankNodes.length).toBe(3);
  const ranks = Array.from(rankNodes).map(node => +node.textContent);
  expect(ranks).toStrictEqual([1,2,3]);
});

test("After the second beat, a 4th product is inserted", async () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
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

  const productIds = Array.from(container.querySelectorAll(".product-id"))
                       .map(node => +node.textContent) ;
  expect(productIds).toStrictEqual([1,5,9,24]);

  const rankNodes = container.querySelectorAll(".product-rank");
  expect(rankNodes.length).toBe(4);
  const ranks = Array.from(rankNodes).map(node => +node.textContent);
  expect(ranks).toStrictEqual([1,2,3,4]);
});

test("After the third beat, a 5th product is inserted", async () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
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

  const productIds = Array.from(container.querySelectorAll(".product-id"))
                       .map(node => +node.textContent) ;
  expect(productIds).toStrictEqual([7,1,5,9,24]);

  const rankNodes = container.querySelectorAll(".product-rank");
  expect(rankNodes.length).toBe(5);
  const ranks = Array.from(rankNodes).map(node => +node.textContent);
  expect(ranks).toStrictEqual([1,1,2,3,4]);
});

test("After the third beat, a 5th product is inserted", async () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
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
  const products = [{id: 1}, {id: 5}, {id: 9}];
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

test("After the 6th beat, there are 6 products", async () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
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

  // this sucks. How might we elegantly handle choreography?
  await wait(() => {}, {interval: 1000});

  const newlyAddedElement = await waitForElement(
    () => container.querySelectorAll('.product-rank').item(0),
    { container }
  );

  expect(newlyAddedElement.textContent).toBe("-1");

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(6);

});

// after beat 7, the ranks are incorrect
test("After the 7th beat, there are 7 products and rows 4+ have their rank incremented by 1", async () => {
  const products = [{id: 1}, {id: 5}, {id: 9}];
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

  // this sucks. How might we elegantly handle choreography?
  await wait(() => {}, {interval: 1000});
  expect(button.textContent).toBe("Oh no :(");

  // @TODO: assert exact rank and id values on each beat
  //  when does the rankings get poisoned?
  const seventhBeatRankNodes = Array.from(container.querySelectorAll('.product-rank'));
                                // .slice(-3)
                                // .map(node => +node.textContent);
  expect(seventhBeatRankNodes.length).toBe(6)
  expect(seventhBeatRankNodes.map(n => +n.textContent)).toStrictEqual([-1,1,2,3,4,5]);
  
  await fireEvent.click(button);

  expect(button.textContent).toBe("That's Impossible!");

  // this sucks. How might we elegantly handle choreography?
  await wait(() => {}, {interval: 1000});

  const eighthBeatRanks = Array.from(container.querySelectorAll('.product-rank'))
                                .slice(-3)
                                .map(node => +node.textContent);

  const newlyAddedElementRank = await waitForElement(
    () => container.querySelectorAll('.product-rank').item(3),
    { container }
  );
  expect(newlyAddedElementRank.textContent).toBe("3");

  expect(eightBeatRanks).toStrictEqual([4,5,6]);

  const lastRank = await waitForElement(
    () => container.querySelectorAll('.product-rank').item(6),
    { container }
  );
  expect(lastRank.textContent).toBe("6");

  const rows = container.querySelectorAll(".product-row");
  expect(rows.length).toBe(7);

  expect(seventhBeatRanks.length).toBe(eighthBeatRanks.length);
  expect(seventhBeatRanks[0]).toBe(eighthBeatRanks[0]);
  eighthBeatRanks.slice(3).forEach((fbr, i) => {
    expect(fbr).toBe(seventhBeatRanks[i] + 1);
  })

});