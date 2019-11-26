import React from 'react';

function Table(props) {
  console.log(props);
  console.log(props.products.map);
  return (
    <div className="Table">
      <h4 className="text-center">{props.name || "Data"} Table</h4>
      <table style={{margin: '0 auto', fontSize: `1.5rem`, textAlign: "right"}}>
        <tbody>
          <tr>
            <th>id</th>
            <th>rank</th>
          </tr>
          {props.products.map(({id, rank}, i) => {
            return (
              <tr className="product-row" key={i}
                  // animate:flip="{{easing: quadInOut}}" 
                >
                <td className="product-id">{id}</td>
                <td>
                    <span className="product-rank"
                          // class:strike="{p.isIncorrectValue}"
                      >{rank}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;