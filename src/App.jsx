import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Calendrier, Footer, Logo, MyButton, Title } from './components/indexComponent'
import PlayGame2 from './app/PlayGame/PlayGame2'



const Index = () => {
  const [btnNewPartie, setBtnNewPartie] = useState(false)
  const handleNewPartie = () => {
    setBtnNewPartie(true)
  }

  if (btnNewPartie == true) {
    return <PlayGame2 />
  }
  return (
    <>
      <div>
        <div className="container">
          <div className="param">
            {/* <MyButton title={'Coupe'} Color={'back'} className={"pa"} />
            <MyButton title={'Paramétre'} Color={'back'} className={"pa"} /> */}
          </div>
          <Calendrier />
          <Title />
          {/* <MyButton BackgroundColor="rgb(83, 83, 247)" Color="white" title={"Continuer la partie"} className={"btn"} /> */}
          <MyButton handleClick={handleNewPartie} BackgroundColor="rgb(83, 83, 247)" Color="white" title={"Nouvelle partie"} className={"btn"} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export var MyContext = createContext()

function App() {
  // const [time, setTime] = useState(2)
  // useEffect(() => {
  //   if (time > 0) {
  //     const timer = setTimeout(() => setTime(time - 1), 1000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [time])

  return (
    <>
      {/* {time > 0 ? (
        <Logo />
      ) : */}
      <Index />
      {/* } */}
    </>
  )
}

export default App
