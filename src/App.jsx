import { useState } from 'react'
import PlayGame from './app/PlayGame'
import viteLogo from '/vite.svg'
import { MyButton } from './components/MyComponent'

const Home = () => {
  const [btnNewPartie, setBtnNewPartie] = useState(false)
  const today = new Date()
  const day = today.getDate()
  const month = today.toLocaleDateString('fr-FR', { month: 'long' })

  const handleNewPartie = () => {
    setBtnNewPartie(true)
  }


  if (btnNewPartie == true) {
    return <PlayGame />
  }

  return (
    <div className='text-xs flex justify-center items-center h-screen w-screen bg-bgColor text-gray'>
      <div className="shadow-xl bg-white h-screen dis:w-screen w-[400px] items-center flex justify-center">
        <div className=" pt-5 px-5">
          {/* option */}
          {/* <div className="flex justify-between mb-5">
            <button className=''>Coupe</button>
            <button>Parametre</button>
          </div> */}
          {/* calendrier */}
          <div className="flex justify-center text-center">
            <div className=" w-[120px] pt-5 pb-2 rounded-xl text-white bg-blue-500">
              <div className="flex justify-center mb-5">
                <img src={viteLogo} alt="" />
              </div>
              <div className="opacity-50" style={{ fontSize: "9px" }}>
                <p> DEFI QUOTIDIEN</p>
              </div>
              <div className="font-bold text-sm my-5 p-0">
                <p>{day} {month}</p>
              </div>
              <div className="text-xs flex justify-center items-center">
                <button onClick={handleNewPartie} style={{ fontWeight: '600' }} className='border-none text-white bg-bgTrans py-0.5 px-3 rounded-2xl'>Jouer</button>
              </div>
            </div>
          </div>
          {/* titre */}
          <div className="text-center font-bold text-2xl py-20">
            <p>Sudoku<span className='font-bold text-blue-500'>.</span>com</p>
          </div>
          {/* bouton */}
          <div className="flex justify-center items-center mb-10">
            <div className="text-center">
              <div className="">
                <MyButton title="Continuer la partie" className="text-white bg-blue-500 mb-2 cursor-not-allowed opacity-50" />
              </div>
              <div className="">
                <MyButton onClick={handleNewPartie} title="Nouvelle partie" className="bg-white text-blue-500" />
              </div>
            </div>
          </div>
        </div>
        {/* tabBarBottom */}
        {/* <div className="flex justify-center">
          <div className="fixed bottom-0">
            <div className="bg-white py-2 border-t-2 border-gray flex justify-around" style={{ fontSize: "10px" }}>
              <button>Accueil</button>
              <button>Défis quotidiens</button>
              <button>Statistiques</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <Home />
    </>
  )
}

export default App
