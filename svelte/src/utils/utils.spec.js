import {listStoreUpdates} from './updateListStore';
import {writable} from 'svelte/store';
import expectExport from 'expect';

test("Three products matching the filter produces one update function"
     , async () => {
  let list = [1,2,3];
  const listStore = writable(list);
  listStore.subscribe(l => list = l);
  const updateList = listStoreUpdates(listStore);

  const funcs = updateList(list, (l, i) => true, [(x) => x+1]);

  expectExport(funcs.length).toBe(3);
  
  funcs.forEach(f => f());

  expect(list).toStrictEqual([2,3,4]);
});

