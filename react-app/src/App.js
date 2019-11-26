import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './table/Table';

import {script} from './script';

function App() {
  let buttonText = "button";
  let dialouge = "Hello";
  function executeOp() {

  }
  const [scene, setScene] = useState(script());
  const [products, setProducts] = useState([]);

  return (
    <main>
      <div className="container vertical-center">
        <div className="row">

          <div className="col-xs-12 col-md-6" id="table-col">
            <Table products={products} name="Product"></Table>
          </div>

          <div className="col-xs-12 col-md-6 order-md-2 vertical-center"
              id="explanation">
            <p className="lead">{dialouge}</p>
            <button onClick={() => {
              const {value, done} = scene.next();
              
              setProducts(value);
              setScene(scene);
            }}>{buttonText}</button>
          </div>

        </div>
      </div>
      
    </main>
  );
}

export default App;
