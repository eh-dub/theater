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
  function choreograph(filter, transform, interval) {
    return () => {
      const affected = products
        .forEach((v, i) => {
          if (filter(v)) {
           products[i] = transform(products[i]); 
          }
        })
    }
  }

  function *script() {
    // [before click, before click, what you click on]
    // [after click, after click, what you are confronted with next]
    // [prompt, data-transformation, acknowledgment/transition/inception]
    // what if you had to speak the inception before you could click?
    let line = "How might we store product ranks in a relational database";
    yield [line, addRanks, "Put it in the data base!"];

    line = "What happens when we insert product 24 into position 3?";
    yield [line, insertRow(3, {id: 24, rank: 3}), "Constant time insertion"];

    line = "Product 23 and 9 both have the same rank. Assume all products must have unique ranks.";
    yield [line, noop, "What is the time complexity of fixing this?"];

    line = "Restoring unique ids is a linear time operation under this approach.";
    yield [ line
          , choreograph((p) => p.id === 9, (p) => Object.assign(p, {isIncorrectValue: true}, 100))
          , "Oh No :)"]
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