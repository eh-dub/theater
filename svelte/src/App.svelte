<script>
  //   - make button position static
  // replaying a scene could be helpful
  // BUG: ranks of 0 don't render the string "0". it just shows nothing

  import {writable} from 'svelte/store'
  import Table from './Table/Table.svelte';
  export let script = function* () { };
  export let products = writable([]);

  function noop() { }

  let dialouge = "";
  let buttonText = "";
  let op = noop;
  function advanceScript() {
    const {value: beat, done: sceneIsOver} = scene.next();
    if (sceneIsOver) { 
     
     op = () => {
       dialouge = "I hope you enjoyed this demo :)"
       buttonText = "I did!";
     }
    } else {
      [dialouge, op, buttonText] = beat;
    }

  }

  function executeOp() {
    if (typeof op === "function") op();
    advanceScript();
  }

  const scene = script(products);
  advanceScript();

</script>

<main style="height: 100%;">
  {#each $products as {id, rank}}
    <div style="margin: 0 5px">{id} : {rank}</div>
  {/each}
  <div class="container vertical-center">
    <div class="row">

      <div class="col-xs-12 col-md-6" id="table-col">
        <Table products="{$products}" name="Product"></Table>
      </div>

      <div class="col-xs-12 col-md-6 order-md-2 vertical-center"
           id="explanation">
        <p class="lead">{dialouge}</p>
        <button on:click="{executeOp}">{buttonText}</button>
      </div>

    </div>
  </div>
  
</main>

<style>
#table-col {
  margin-bottom: 2rem;
}

button {
  width: 80%;
  margin: 0 auto;
}

main {
  display: flex; 
  align-items: center;
}

p {
  margin-bottom: 2rem;
}

.vertical-center {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

@keyframes appear {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>