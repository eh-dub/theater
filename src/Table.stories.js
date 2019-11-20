import Table from './Table.svelte';

export default { title: 'Table' };

export const withOneProduct = () => ({
  Component: Table,
  props: {
    products: [{id: 1, rank: 1}],
  },
});

export const withTwoProducts = () => ({
  Component: Table,
  props: {
    products: [{id: 1, rank: 1}, {id: 2, rank: 2}],
  },
});
