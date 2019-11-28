import React from 'react';
import {useSpring, animated, useTransition} from 'react-spring'

function ProductRow(props) {
// const spring = useSpring({opacity: 1, from: {opacity: 0}})
return (
  <tr className="product-row"
  >
    <td className="product-id">{props.id}</td>
    <td>
      <span  className="product-rank"
      >{props.rank}</span>
    </td>
  </tr>
  )
};

function Table(props) {
  const ids = props.products.map(p => p.id);
  console.log("ids")
  console.log(ids)
  const ranks = props.products.map(p => p.rank);
  const idTransitions = useTransition(ids, item => `id:${item}`, {
    from: { transform: 'translate3d(-40px,0px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0px,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(-40px,0px,0)', opacity: 0 },
  })
  const rankTransitions = useTransition(ranks, item => `rank:${item}`, {
    from: { transform: 'translate3d(40px,0px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0px,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(40px,0px,0)', opacity: 0 },
  })
  const idNodes = idTransitions.map(({ item, props, key }) => {
    return ( <animated.td style={props} className="product-id" key={key}>{item}</animated.td>)
  });

  const rankNodes = rankTransitions.map(({item, props, key}) => {
    return ( <animated.td style={props} className="product-rank" key={key}>{item}</animated.td>)
  });

  const rows = props.products.map((p,i) => {
    return (
      <tr key={i} className="product-row">
        {idNodes[i]}
        {rankNodes[i]}
      </tr>
    )
  })
  return (
    <div className="Table">
      <h4 className="text-center">{props.name || "Data"} Table</h4>
      <table style={{margin: '0 auto', fontSize: `1.5rem`, textAlign: "right"}}>
        <tbody>
          <tr>
            <th>id</th>
            <th>rank</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default Table;