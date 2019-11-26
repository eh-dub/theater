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
}
