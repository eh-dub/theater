<script>
  import {quintInOut} from 'svelte/easing';
  import {flip} from 'svelte/animate';
  export let name;

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

  let scriptIndex = 0;
  const linesOfDialouge = [
    "How might we store product ranks in a relational database?",
    "What happens when we insert product 24 into position 3?",
    "Oh no :("
  ];

  function noop() {

  }

  function *script() {
    // [prompt, data-transformation, acknowledgment/transition/inception]
    // what if you had to speak the inception before you could click?
    yield ["How might we store product ranks in a relational database", noop, "Put it in the data base!"];
    yield ["What happens when we insert product 24 into position 3?", addRanks, "Constant time insertion"];
    yield ["Oh no :(", insertRow(3, {id: 24, rank: 3}), "Oh no :("]; 
  }


  let dialouge = "";
  let buttonText = "";
  let op = noop;
  function advanceScript() {
    const {value: beat, done: sceneIsOver} = scene.next();
    if (sceneIsOver) { return }

    [dialouge, op, buttonText] = beat;
    op();
  }

  const scene = script();
  advanceScript();

</script>

<main style="height: 100%;">
  <div class="container vertical-center">
    <div class="row">
      <div class="col-xs-12 col-md-6 order-md-2 vertical-center">
        <p class="lead">{dialouge}</p>
        <button on:click="{advanceScript}">{buttonText}</button>
      </div>

      <div class="col-xs-12 col-md-6">
        <h4 class="">Product Table</h4>
        <table style="margin: 0 auto; font-size: 2rem; text-align: right">
          <tbody>
            <tr>
              <th>id</th>
              <th>rank</th>
            </tr>
        
            {#each products as p (p.id)}
              <tr class="product-row" animate:flip="{{easing: quintInOut}}" >
                <td>{p.id}</td>
                <td>
                  {#if p.rank}
                    <span class="product-rank"
                    >{p.rank}</span>
                  {/if}
                </td>
              </tr>
            {/each}
        
          </tbody>
        </table>
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