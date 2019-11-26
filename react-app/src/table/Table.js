import React from 'react';
import {useSpring, animated} from 'react-spring'

function ProductRow(props) {
const spring = useSpring({opacity: 1, from: {opacity: 0}})
return (
  <animated.tr style={spring} className="product-row"
      // animate:flip="{{easing: quadInOut}}"
  >
    <td className="product-id">{props.id}</td>
    <td>
      <animated.span style={spring} className="product-rank"
      >{props.rank}</animated.span>
    </td>
  </animated.tr>
  )
};

function Table(props) {
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
            return <ProductRow id={id} rank={rank} key={i}></ProductRow>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;