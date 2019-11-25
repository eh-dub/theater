// UI to write the body of *script
// how might the idea generalize beyond tables?
// Could it be an explanatory medium comrpised of computation
//    that is an instantatian of the class that has spawned
//    libraries such as D3, Vega, 

import flatMap from 'lodash/flatMap';


// TODO:
// clean up abstraction such that multiple row insertions can be choreographed

function noop() { }

// script monad? :O
// just write out the monad laws. ask sandy about his game. it was a kind of script
export function *script(productStore) {

  let products = [];
  let unsubscribe = productStore.subscribe(ps => products = ps);

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

  // choreograph accepts a list of functions and a list of intervals
  //  if the list is of length one, use that interval for all, else assert the list is the same length
  //  as the list of functions
  // - this separates the products updating functions from assigning execution times to said function
  // - one engineering shortcoming is that the end of one call does not trigger the next. the loose
  //   coordination between all functions leaves room for race conditions. I don't expect this to be 
  //   apparent in the front-end in the current demo, but I wouldn't stake my life on it

  function choreograph(funcs, interval = 200) {
    return () => {
      funcs.forEach((f,i) => {
        window.setTimeout(() => {
          f();
        }, interval*i)
      })
    }
  }

  function updateProducts(filter, transforms, interval) {
  
    const productUpdates = flatMap(transforms, (t, ti) => {
      return products.map((v, i) => {
        if (filter(v, i)) { 
          return () => {
              productStore.update(ps => {
                ps[i] = t(ps[i], i);
                return ps;
              })
          }
        } else {
          return noop;
        }
      });
    });

    return productUpdates;
  }
  

  // [prompt, data-transformation, acknowledgment/transition/inception]

  // beat 1
  let line = "How might we store product ranks in a relational database";
  yield [line, addRanks, "Put it in the data base!"];

  // beat 2
  line = "What happens when we insert product 24 into position 5?";
  yield [line, insertRow(7, {id: 24, rank: 4}), "Constant time insertion!"];

  // beat 3
  line = "What happens when we insert product 7 into position 1?"
  yield [line, insertRow(1, {id: 7, rank: 1}), "Constant time insertion?"];

  // beat 4
  line = "Product 7 and 1 both have the same rank. Assume all products must have unique ranks.";
  let productUpdates = updateProducts((p, i) => i >= 1
                      ,[ (p) => Object.assign(p, {isIncorrectValue: true})
                        , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
                        ]
                      , 200);
  yield [ line
        , choreograph(productUpdates)
        , "What is the time complexity of fixing this?"];

  // beat 5
  line = "Restoring unique ids is a linear time operation under this approach.";
  yield [ line
        , noop
        , "Oh no :("];

  // how might we treat these like the choreography?
  // it would be great if these happened one after another
  // beat 6
  line = "Ranking is a relative measurement. To determine the first item we can look at the lowest number. Can you think of a number lower than 1?";
  productUpdates = insertRow(1, {id: 77, rank: -1});
  yield [ line
        , choreograph([productUpdates])
        , "Oh yeah!"
        ]
  
  // beat 7
  line = "However, this doesn't help if we insert Product 6 into position 3";
  productUpdates = [insertRow(4, {id: 6, rank: 3})].concat(
    updateProducts( (p, i) => i >= 4
      , [ (p) => Object.assign(p, {isIncorrectValue: true})
        , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
        ]
      , 200
    )
  );
  yield [ line
        , choreograph(productUpdates)
        , "Oh no :("
        ]
  // beat 8
  line = "How might we achieve constant time insertion for any rank?"
  yield [ line
        , noop
        , "That's Impossible!"
        ]
  
  // beat 9
  line = "What if we create some room?"
  productUpdates = updateProducts( (p, i) => true
                      , [(p) => Object.assign(p, {rank: p.rank*8})]
                      , 200)

  yield [ line
        , choreograph(productUpdates)
        , "I'm listening..."
        ]
  // beat 10
  line = "How many constant time insertions does this buy us per position?"
  productUpdates = [ insertRow(3, {id: 4, rank: 12})
                   , insertRow(3, {id: 3, rank: 10})
                   , insertRow(3, {id: 2, rank: 9})];
          
  yield [ line
        , choreograph(productUpdates)
        , "log(8) = 3"
        ]

  // beat 11
  line = "And that's one way to amortize a linear time update"
  productUpdates = updateProducts( (p, i) => true
                      , [(p, i ) => Object.assign(p, {rank: (i+1)*1024})]
                      , 200
                   )
 
  yield [ line
        , choreograph(productUpdates)
        , "Neat!"
        ]

  unsubscribe();
  
}

// let line = "How might we store product ranks in a relational database";
//     yield [line, addRanks, "Put it in the data base!"];
//     line = "What happens when we insert product 24 into position 4?";
//     yield [line, insertRow(7, {id: 24, rank: 4}), "Constant time insertion!"];
//     line = "What happens when we insert product 7 into position 1?"
//     yield [line, insertRow(1, {id: 7, rank: 1}), "Constant time insertion?"];
//     line = "Product 7 and 1 both have the same rank. Assume all products must have unique ranks.";
//     yield [ line
//           , updateProducts((p, i) => i >= 1
//                        ,[ (p) => Object.assign(p, {isIncorrectValue: true})
//                         , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
//                         ]
//                        , 200)
//           , "What is the time complexity of fixing this?"];
//     line = "It is a linear time operation.";
//     yield [ line
//           , noop
//           , "Oh no :("];
//     // how might we treat these like the choreography?
//     // it would be great if these happened one after another
//     line = "Ranking is a relative measurement. To determine the first item we can look at the lowest number. Can you think of a number lower than 1?";
//     yield [ line
//           , () => {
//             insertRow(1, {id: 77, rank: -1})()
//           }
//           , "Oh yeah!"
//           ]
    
//     line = "However, this doesn't help if we insert Product 6 into position 3.";
//     yield [ line
//           , () => {
//             insertRow(4, {id: 6, rank: 3})();
//             updateProducts( (p, i) => i >= 4
//                        , [ (p) => Object.assign(p, {isIncorrectValue: true})
//                          , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
//                          ]
//                        , 200
//                        )()
//           }
//           , "Oh no :("
//           ];
    
    // line = "How might we achieve constant time insertion for any rank?"
    // yield [ line
    //       , noop
    //       , "That's Impossible!"
    //       ]
    
    // line = "What if we create some room?"
    // yield [ line
    //       , updateProducts( (p, i) => true
    //                    , [(p) => Object.assign(p, {rank: p.rank*8})]
    //                    , 200)
    //       , "I'm listening..."
    //       ]
    // line = "How many constant time insertions does this buy us per position?"
    // yield [ line
    //       , () => {
    //         insertRow(3, {id: 4, rank: 12})();
    //         insertRow(3, {id: 3, rank: 10})();
    //         insertRow(3, {id: 2, rank: 9})();
    //       }
    //       , "log(8) = 3"
    //       ]
    // line = "And that's one way to amortize a linear time update"
    // yield [ line
    //       , choreograph( (p, i) => true
    //                    , [(p, i ) => Object.assign(p, {rank: (i+1)*1024})]
    //                    , 200
    //       )
    //       , "Neat!"
    //       ]