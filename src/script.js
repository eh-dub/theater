// UI to write the body of *script
// how might the idea generalize beyond tables?
// Could it be an explanatory medium comrpised of computation
//    that is an instantatian of the class that has spawned
//    libraries such as D3, Vega, 



// <!-- @TODO:
//   - make button position static
//   - clean up abstraction such that multiple row insertions can be choreographed
//   - why doesn't 0 render?
//  -->
import { products as productStore } from './products.js';

function noop() { }


function addRanks() {
  productStore.update(ps => ps.map((p, i) => Object.assign({rank: i+1}, p)));
}

function insertRow(position, row) {
  return () => {
    const offset = position - 1;
    productStore.update(ps => {
      ps.splice(offset, 0, row);
      return ps;
    })
  }
}

// script monad? :O
// just write out the monad laws. ask sandy about his game. it was a kind of script
export function *script() {

  let products = [];
  let unsubscribe = productStore.subscribe(ps => products = ps);

  function choreograph(filter, transforms, interval) {
    return () => {
  
      const sequences = transforms.map((t, ti) => {
        return products.map((v, i) => {
          if (filter(v, i)) { 
            return () => {
              window.setTimeout(() => {
                productStore.update(ps => {
                  ps[i] = t(ps[i], i);
                  return ps;
                })
                // products[i] = t(products[i], i);
              }, interval*i + (interval * products.length * ti))
            }
          } else {
            return noop;
          }
        });
      })
  
      sequences.forEach(sequence => {
        sequence.forEach(s => {
          s();
        })
      }); 
      
    }
  }
  

  // [prompt, data-transformation, acknowledgment/transition/inception]
  let line = "How might we store product ranks in a relational database";
  yield [line, addRanks, "Put it in the data base!"];

  line = "What happens when we insert product 24 into position 5?";
  yield [line, insertRow(7, {id: 24, rank: 4}), "Constant time insertion!"];

  line = "What happens when we insert product 7 into position 1?"
  yield [line, insertRow(1, {id: 7, rank: 1}), "Constant time insertion?"];

  line = "Product 7 and 1 both have the same rank. Assume all products must have unique ranks.";
  yield [ line
        , () => {
            choreograph((p, i) => i >= 1
                      ,[ (p) => Object.assign(p, {isIncorrectValue: true})
                        , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
                        ]
                      , 200)()
          }
        , "What is the time complexity of fixing this?"];

  line = "Restoring unique ids is a linear time operation under this approach.";
  yield [ line
        , noop
        , "Oh no :("];

  // how might we treat these like the choreography?
  // it would be great if these happened one after another
  line = "Ranking is a relative measurement. To determine the first item we can look at the lowest number. Can you think of a number lower than 1?";
  yield [ line
        , () => {
          insertRow(1, {id: 77, rank: "0"})()
        }
        , "Oh yeah!"
        ]
  
  line = "However, this doesn't help if we insert Product 6 into position 3";
  yield [ line
        , () => {
          insertRow(4, {id: 6, rank: 3})();
          choreograph( (p, i) => i >= 4
                     , [ (p) => Object.assign(p, {isIncorrectValue: true})
                       , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
                       ]
                     , 200
                     )()
        }
        , "Oh no :("
        ]

  unsubscribe();
  
}