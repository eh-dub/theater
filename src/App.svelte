<script>
  import Table from './Table.svelte';
  let products = [
    {id: 1},
    {id: 5},
    {id: 9},
    {id: 2},
    {id: 23},
    {id: 11},
  ]

  function addRanks() {
    products = products.map((p, i) => Object.assign({rank: i+1}, p));
  }

  function insertRow(position, row) {
    return () => {
      const offset = position - 1;
      products.splice(offset, 0, row);
      products = products;
    }
  }

  function noop() {

  }

  // the genericization of choreograph is v interesting.
  // the data-type defines a dsl of transforms
  // now there is a second level of nesting which means that every time a
  // transform is applied, the changes to other products is lost
  // need more robust state management.
  // could I use a generator and a store?
  // generate the instantiated transforms for each product (this would eliminate one of the nestings)
  function choreograph(filter, transforms, interval) {
    return () => {

      const sequences = transforms.map((t, ti) => {
        return products.map((v, i) => {
          if (filter(v, i)) {
            return () => {
              window.setTimeout(() => {
                products[i] = t(products[i]);
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

  function *script() {
    // [before click, before click, what you click on]
    // [after click, after click, what you are confronted with next]
    // [prompt, data-transformation, acknowledgment/transition/inception]
    // what if you had to speak the inception before you could click?
    let line = "How might we store product ranks in a relational database";
    yield [line, addRanks, "Put it in the data base!"];

    line = "What happens when we insert product 24 into position 7?";
    yield [line, insertRow(7, {id: 24, rank: 7}), "Constant time insertion!"];

    line = "What happens when we insert product 7 into position 1?"
    yield [line, insertRow(1, {id: 7, rank: 1}), "Oh no :("];

    line = "Product 7 and 1 both have the same rank. Assume all products must have unique ranks.";
    yield [line, noop, "What is the time complexity of fixing this?"];

    line = "Restoring unique ids is a linear time operation under this approach.";
    yield [ line
          , choreograph((p, i) => i >= 1
                       ,[ (p) => Object.assign(p, {isIncorrectValue: true})
                        , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
                        ]
                       , 200)
          , "Oh No :("];
    
  }

  let dialouge = "";
  let buttonText = "";
  let op = noop;
  function advanceScript() {
    const {value: beat, done: sceneIsOver} = scene.next();
    if (sceneIsOver) { return }

    [dialouge, op, buttonText] = beat;
  }

  function executeOp() {
    op();
    advanceScript();
  }

  const scene = script();
  advanceScript();

</script>

<main style="height: 100%;">
  <div class="container vertical-center">
    <div class="row">
      <div class="col-xs-12 col-md-6 order-md-2 vertical-center">
        <p class="lead">{dialouge}</p>
        <button on:click="{executeOp}">{buttonText}</button>
      </div>

      <div class="col-xs-12 col-md-6">
        <Table bind:products name="Product"></Table>
      </div>
    </div>
  </div>
  
</main>

<style>
main {
}

.vertical-center {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

table {
  border-collapse: separate;
  border-spacing: 1rem 0.5rem;
}

/* .product-row {
  animation: 1s ease-in 0s 1 both running appear;
}

.product-rank {
  animation: 1s ease-in 0s 1 both running appear;
} */

@keyframes appear {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>