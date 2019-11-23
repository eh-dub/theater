<script>
  import {writable} from 'svelte/store'
  // what's a regex that will enable transforms of 
  // svelte components through the index. can it be done?
  // should it be done?
  import Table from './Table/Table.svelte';
  // import {script} from './script.js';
  export let script = function* () { };
  export let products = writable([]);

  function noop() { }

  // replaying a scene could be helpful
  // BUG: ranks of 0 don't render the string "0". it just shows nothing

  let dialouge = "";
  let buttonText = "";
  let op = noop;
  function advanceScript() {
    const {value: beat, done: sceneIsOver} = scene.next();
    if (sceneIsOver) { 
     
     op = () => {
      //  products = [];
      //  products.update(ps => []);
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
        <Table products="{$products}" name="Product"></Table>
      </div>
    </div>
  </div>
  
</main>

<style>
main {
  background-color: rgba(10, 10, 10, 0.6);
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