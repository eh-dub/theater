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
}