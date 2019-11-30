function addRanks(products, setProducts) {
  products = products.map((p, i) => ({...p, rank: i+1}))
  setProducts(products);
}

export function *script() {
  let dialouge = "How might we store product ranks in a relational database";
  let op = addRanks
  yield { op
        , dialouge
        , buttonText: "Start with 1..."
        };

  dialouge = "What happens when we insert product 24 into position 4?";
  op = (products, setProducts) => {setProducts([...products, {id:24, rank:4}])};
  yield { op
  , dialouge
  , buttonText: "Constant time insertion!"
  }; 

  dialouge = "What happens when we insert product 7 into position 1?"
  op = (products, setProducts) => {setProducts([{id: 7, rank: 1}, ...products])}
  yield { op
        , dialouge
        , buttonText: "Constant time insertion?"
  };

  dialouge = "Product 7 and 1 both have the same rank. Assume all products must have unique ranks.";
  let buttonText = "What is the time complexity of fixing this clash of ranks?";
  op = (products, setProducts) => {
    const updatedProducts = products.map((p,i) => {
      if (i === 0) return p;
      else return {...p, rank: p.rank+1};
    });

    setProducts(updatedProducts);
  }
  yield { op
        , dialouge
        , buttonText 
        }


  // beat 5
  dialouge = "Restoring unique ids is a linear time operation under this approach.";
  op = () => {}
  buttonText = "Oh no :(";
  yield { dialouge
        , op
        , buttonText
      }


  // beat 6
  dialouge = "Ranking is a relative measurement. To determine the first item we can look at the lowest number. Can you think of a number lower than 1?";
  op = (products, setProducts) => {
    const updatedProducts = [{id: 77, rank: 0}, ...products];
    setProducts(updatedProducts);
  }
  buttonText = "Oh yeah!";
  yield { dialouge
        , op
        , buttonText
      }
        
  // beat 7
  // Can't generate the appropriate updateProducts function calls
  //  until the insertRow is complete
  // How might we chain the creation of the functions? can cues be a useful metaphor here?
  dialouge = "However, this doesn't help if we insert Product 6 into position 3";
  op = (products, setProducts) => {
    const targetProducts = products.filter((p, i) => i >= 3).map(p => ({...p, rank: p.rank+1}));
    const updatedProducts = [products[0], products[1], products[2], {id: 6, rank: 3}, ...targetProducts];

    setProducts(updatedProducts);
  }
  buttonText = "Oh no :(";
  yield { dialouge
        , op
        , buttonText
        }
  // beat 8
  dialouge = "How might we achieve constant time insertion for any rank?"
  op = () => {}
  buttonText = "That's Impossible!"
  yield { dialouge
        , op
        , buttonText
        }
  
  // beat 9
  dialouge = "What if we create some room?"
  op = (products, setProducts) => {
    const updatedProducts = products.map(p => ({...p, rank: p.rank*8}));
    setProducts(updatedProducts);
  }
  buttonText = "I'm listening...";
  yield { dialouge
        , op
        , buttonText
        }
  // beat 10
  dialouge = "How many constant time insertions does this buy us per position?"
  op = (products, setProducts) => {
    const updatedProducts = [...products.slice(0,2)
                            , {id: 4, rank:9}
                            , {id: 3, rank:10}
                            , {id: 2, rank:12}
                            , ...products.slice(3)
                            ];
    setProducts(updatedProducts);
  }
          
  buttonText = "log(8) = 3";
  yield { dialouge
        , op
        , buttonText
        }

  // beat 11
  dialouge = "And that's one way to amortize a linear time update"
  op = (products, setProducts) => {
    const updatedProducts = products.map((p,i) => ({...p, rank: (i)*1024}));
    setProducts(updatedProducts);
  }
 
  buttonText = "Neat!";
  yield { dialouge
        , op
        , buttonText
        }
}
