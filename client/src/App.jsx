import React, {useState, useEffect} from 'react'
import './App.css'
import Axios from "axios";
import Card from "./components/card";

function App() {

    const baseUrl = "http://publiclb-314884982.us-east-1.elb.amazonaws.com/api"

    const [values, setValues] = useState();
    const [games, setGames] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/register`, {
            name: values.name,
            cost: values.cost,
            category: values.category,
        }).then((response) =>{
            console.log(response)
        });
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/games`)
            .then((response)=>{
            setGames(response.data)
        })
        }
    )


  return (
    <div className="App">
      <div className="container">
          <h1 className="title">Game Shop</h1>
          <h3>Add a Game</h3>
          <img src="https://tpbucket25.s3.us-east-1.amazonaws.com/Capture+d'%C3%A9cran+2025-01-29+215746.png" > </img>
          <div className="register-box">
              <input className="register-input" type="text" name="name" placeholder="Title" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="cost" placeholder="Cost" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="category" placeholder="Category" onChange={handleChangeValues} />
              <button className="register-button" onClick={handleClickButton}>Add</button>
          </div>
          <br/>
          <div className="cards">
              {typeof games !== 'undefined' &&
                  games.map((game) => {
                      return <Card
                          key={game.idgames}
                          id={game.idgames}
                          name={game.name}
                          cost={game.cost}
                          category={game.category}

                      >
                      </Card>;
                  })}
          </div>
      </div>
    </div>
  )
}

export default App
