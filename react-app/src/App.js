import React, {useState} from 'react';


import './App.css';
import Table from './table/Table';

import {script} from './script';

// Lead for replaying/scrubbing through the script
// https://github.com/pelotom/immutagen

// how might I get a "Light table" view a la Keynote
function App() {

  const [scene, setScene] = useState(script());
  const [products, setProducts] = useState([{id: 1}
                                           ,{id: 2}
                                           ,{id: 3}
                                          ]);
  const [state, setState] = useState({buttonText: "Let's Start"
                                    , dialouge: "Managers of online stores constantly adjust the display order of products. The high frequency of updates requires that the execution time of updates is low. This story explains a storage scheme for product ranks that I devised and implemented."
                                    , finished: false
                                    , op: () =>{}
                                    });


  function executeOp() {
    if (state.op) state.op(products, setProducts);
    advanceScene();
  }

  function advanceScene() {
    if (state.finished) return;

    const {value, done} = scene.next();

    if (!done) {
      setState({...value, finished: false});
    } else {
      setState({finished: true
        , buttonText: "All done!"
        , dialouge: "Thanks for playing!"
        , op: () => {}
        });
    }
    setScene(scene);
  }


  return (
    <main>
      <div className="container vertical-center">
        <div className="row">

          <div className="col-xs-12 col-md-6" id="table-col">
            <Table products={products} name="Product"></Table>
          </div>

          <div className="col-xs-12 col-md-6 order-md-2 vertical-center"
              id="explanation">
            <p className="lead">{state.dialouge}</p>
            <button onClick={executeOp}>{state.buttonText}</button>
          </div>

        </div>
      </div>
      
    </main>
  );
}

export default App;
