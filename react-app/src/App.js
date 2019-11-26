import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './table/Table';

import {script} from './script';

function App() {
  let buttonText = "button";
  let dialouge = "Hello";
  let isSceneOver = false;
  function executeOp() {
    const {value, done} = scene.next();
    isSceneOver = done;
    setState(value);
    setScene(scene);
  }
  const [scene, setScene] = useState(script());
  // const [products, setProducts] = useState([]);
  const [state, setState] = useState({products: [], buttonText: "button", dialouge: "hello"});

  return (
    <main>
      <div className="container vertical-center">
        <div className="row">

          <div className="col-xs-12 col-md-6" id="table-col">
            <Table products={state.products} name="Product"></Table>
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
