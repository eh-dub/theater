import flatMap from 'lodash/flatMap';
import curry from 'lodash/curry';

function updateListStore(store, list, filter, transforms) {

  const updates = flatMap(transforms, t => {
    return list.map((v, i) => {
      if (filter(v, i)) { 
        return () => {
            store.update(ps => {
              ps[i] = t(ps[i], i);
              return ps;
            })
        }
      } else {
        return undefined;
      }
    });
  });

  return updates.filter(u => u);
}

export const listStoreUpdates = curry(updateListStore);
