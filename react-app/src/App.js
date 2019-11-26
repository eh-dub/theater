import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './table/Table';

function App() {
  let buttonText = "button";
  let dialouge = "Hello";
  let products = [ {id: 1, rank:1}
                 , {id: 2, rank:2}
                 , {id: 3, rank:3}
                 ]
  function executeOp() {

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
            <p className="lead">{dialouge}</p>
            <button onClick={executeOp}>{buttonText}</button>
          </div>

        </div>
      </div>
      
    </main>
  );
}

export default App;
