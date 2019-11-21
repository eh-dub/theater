<script>
  import Table from './Table.svelte';
  let products = [
    {id: 1},
    {id: 5},
    {id: 9},
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

  function noop() { }

  function choreograph(filter, transforms, interval) {
    return () => {

      const sequences = transforms.map((t, ti) => {
        return products.map((v, i) => {
          if (filter(v, i)) {
            return () => {
              window.setTimeout(() => {
                products[i] = t(products[i], i);
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

  // replaying a scene could be helpful

  function *script() {
    // [prompt, data-transformation, acknowledgment/transition/inception]
    let line = "How might we store product ranks in a relational database";
    yield [line, addRanks, "Put it in the data base!"];

    line = "What happens when we insert product 24 into position 4?";
    yield [line, insertRow(7, {id: 24, rank: 4}), "Constant time insertion!"];

    line = "What happens when we insert product 7 into position 1?"
    yield [line, insertRow(1, {id: 7, rank: 1}), "Constant time insertion?"];

    line = "Product 7 and 1 both have the same rank. Assume all products must have unique ranks.";
    yield [ line
          , choreograph((p, i) => i >= 1
                       ,[ (p) => Object.assign(p, {isIncorrectValue: true})
                        , (p) => Object.assign(p, {isIncorrectValue: false, rank: p.rank+1})
                        ]
                       , 200)
          , "What is the time complexity of fixing this?"];

    line = "It is a linear time operation.";
    yield [ line
          , noop
          , "Oh no :("];

    // how might we treat these like the choreography?
    // it would be great if these happened one after another
    line = "Ranking is a relative measurement. To determine the first item we can look at the lowest number. Can you think of a number lower than 1?";
    yield [ line
          , () => {
            insertRow(1, {id: 77, rank: -1})()
          }
          , "Oh yeah!"
          ]
    
    line = "However, this doesn't help if we insert Product 6 into position 3.";
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
          ];
    
    line = "How might we achieve constant time insertion for any rank?"
    yield [ line
          , noop
          , "That's Impossible!"
          ]
    
    line = "What if we create some room?"
    yield [ line
          , choreograph( (p, i) => true
                       , [(p) => Object.assign(p, {rank: p.rank*8})]
                       , 200)
          , "I'm listening..."
          ]
    line = "How many constant time insertions does this buy us per position?"
    yield [ line
          , () => {
            insertRow(3, {id: 4, rank: 12})();
            insertRow(3, {id: 3, rank: 10})();
            insertRow(3, {id: 2, rank: 9})();
          }
          , "log(8) = 3"
          ]
    line = "And that's one way to amortize a linear time update"
    yield [ line
          , choreograph( (p, i) => true
                       , [(p, i ) => Object.assign(p, {rank: (i+1)*1024})]
                       , 200
          )
          , "Neat!"
          ]
  }

  // BUG: ranks of 0 don't render the string "0". it just shows nothing

  let dialouge = "";
  let buttonText = "";
  let op = noop;
  function advanceScript() {
    const {value: beat, done: sceneIsOver} = scene.next();
    if (sceneIsOver) { 
     
     op = () => {
       products = [];
       dialouge = "I hope you enjoyed this demo :)"
       buttonText = "I did!";
     }
    } else {
      [dialouge, op, buttonText] = beat;
    }

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