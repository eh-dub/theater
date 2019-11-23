// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
// import '@testing-library/jest-dom/extend-expect'

// import Table from "./"
const Table = require('./Table.svelte');
require("@testing-library/jest-dom/extend-expect.js");

// import { render, fireEvent } from '@testing-library/svelte'
const {render, fireEvent} = require('@testing-library/svelte');

test("shows proper title when rendered", () => {
  const { getByText } = render(Table, { props: {name: "Data"} });

  expect(getByText('Data Table')).toBeInTheDocument();
})

test("creates 0 rows for 0 products", () => {
  let {container} = render(Table, {props: {products: []} })
  expect(container.querySelectorAll('.product-row').length).toBe(0); 
});

test("creates 1 row for for 1 product", () => {
  let {container} = render(Table, {props: { products: [{id: 1, rank: 5}]} } )
  expect(container.querySelectorAll('.product-row').length).toBe(1); 
});

test("creates 8 row for for 8 product", () => {
  let products = [{}, {}, {}, {}, {}, {}, {}, {}];
  let {container} = render(Table, {props: { products}  } )
  expect(container.querySelectorAll('.product-row').length).toBe(8); 
});

