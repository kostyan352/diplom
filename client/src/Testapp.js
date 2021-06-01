import React, {useState,useEffect} from 'react'

export default function App() {
 const [state, setState] = useState({data:[]})
    
 useEffect(() => {
    fetch("www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
        //   const uniqDeps = [...new Set(result.map(x => x.MDepart))]
         setState({
             data:result.drinks
            })
        })
      },[])
    return (
        <div>
        <ul>
            {state.map(array =>(
                <li key={array.name}>
                    {array.strDrink}
                </li>
            ))}
        </ul>
        </div>
    )
}
