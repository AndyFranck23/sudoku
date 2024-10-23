import React from 'react'
import { Title } from './indexComponent'
import "../app/PlayGame/autre/Pause.css"
import "../app/PlayGame/PlayGame.css"

export const Parametre = () => {
    return (
        <div className="header">
            {/* <button>Retour</button> */}
            <Title />
            {/* <div className="btnTest">
                <button>Thème</button>
                <button>Paramètre</button>
            </div> */}
        </div>
    )
}

export const Pause = ({ Time, Pause, click }) => {
    return (
        <div className='PauseGame' style={{ display: Pause, zIndex: 1000 }}>
            <div>
                <p className='titlePause'>Pause</p>
                <div className="caract">
                    <div className="propsPause">
                        <p style={{ opacity: 0.5 }}>Time</p>
                        <p style={{ fontWeight: 500, fontSize: '15px' }}>{Math.floor(Time / 60)}:{('0' + (Time % 60)).slice(-2)}</p>
                    </div>
                    <div className="propsPause">
                        <p style={{ opacity: 0.5 }}>Difficulté</p>
                        <p style={{ fontWeight: 500, fontSize: '15px' }}>Par défaut</p>
                    </div>
                </div>
                <p>UseFul Tip</p>
                <div className="event">
                    <p>logo</p>
                    <p>Events</p>
                    <p>Don't forget to participate in events and earn medals!</p>
                </div>
                <button onClick={click}>Reprendre</button>
            </div>
        </div>
    )
}

export const Message = ({ style, newGame }) => {
    return (
        <>
            <div className="overlay" style={{ display: style.display, zIndex: 500 }}></div>
            <div className='loseGame' style={style}>
                <div>
                    <p className='loseTitle'>Partie terminée</p>
                    <p className='message'>Vous avez commis 3 erreurs et avez perdu cette partie</p>
                    <button className='secondChance'>Seconde chance</button><br />
                    <button className='newGame' onClick={newGame}>Nouvelle partie</button>
                </div>
            </div>
        </>
    )
}

export const Winner = ({ style, score, time, newGame }) => {
    return (
        <div>
            <div className="overlay" style={{ display: style.display, zIndex: 500 }}></div>
            <div className='loseGame' style={style}>
                <div>
                    <p className='loseTitle'>Partie terminée</p>
                    <p className='message'>Vous avez Gagné</p>
                    <p className='message'>Score: {score}</p>
                    <p className='message'>Time: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</p>
                    <button className='newGame' onClick={newGame}>Nouvelle partie</button>
                </div>
            </div>
        </div>
    )
}

export default Message