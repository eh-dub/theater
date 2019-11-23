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

// // Note: This is as an async test as we are using `fireEvent`
// test('changes button text on click', async () => {
//   const { getByText } = render(Comp, { props: { name: 'World' } })
//   const button = getByText('Button')

//   // Using await when firing events is unique to the svelte testing library because
//   // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
//   await fireEvent.click(button)

//   expect(button).toHaveTextContent('Button Clicked')
// })

test('returns true', () => {
  expect(true).toBe(true);
})