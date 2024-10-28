import React from 'react'


export const MyButton = ({ title, onClick, className }) => {
    return (
        <button onClick={onClick} className={`${className} text-md border-none py-2 rounded-2xl font-bold shadow-lg w-[200px]`}>
            {title}
        </button>
    )
}

export const Logo = () => {
    return (
        <div className="col1">
            <table>
                <tr>
                    <td style={{ color: 'rgb(28, 111, 219)' }}>5</td>
                    <td>4</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td style={{ color: 'rgb(28, 111, 219)' }}>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td style={{ color: 'rgb(28, 111, 219)' }}>8</td>
                </tr>
            </table>
        </div>
    )
}

export const Parametre = () => {
    return (
        <div className="header">
            {/* <button>Retour</button> */}
            <div className="titre2">
                <legend>Sudoku<span style={{ color: 'rgb(83, 83, 247)', fontWeight: '700' }}>.</span>com</legend>
            </div>
            {/* <div className="btnTest">
                <button>Thème</button>
                <button>Paramètre</button>
            </div> */}
        </div>
    )
}

export const Pause = ({ Time, Pause, click, newPartie }) => {
    return (
        <>
            <div onClick={click} className="fixed bg-black/30 top-0 left-0 m-0 p-0 h-screen w-screen z-50 backdrop-blur-xl" style={{ display: Pause }}></div>
            <div className='ps:text-sm text-xs absolute bg-pauseGame rounded-2xl w-[190px] ps:rounded-2xl p-4 ps:w-[300px]' style={{ display: Pause, zIndex: 100, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <div>
                    <p className='text-xl'>Pause</p>
                    <div className="flex justify-around mb-2">
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
                    <div className="mb-5">
                        <p>logo</p>
                        <p>Events</p>
                        <p>Don't forget to participate in events and earn medals!</p>
                    </div>
                    <div className="">
                        <div className="">
                            <MyButton title="Reprendre" onClick={click} className="bg-blue-500 text-white mb-2" />
                        </div>
                        <div className="">
                            <MyButton title="Nouvelle partie" onClick={newPartie} className="text-blue-500" />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export const Message = ({ click, display, luck, error }) => {
    return (
        <>
            <div className="fixed bg-black/30 top-0 left-0 m-0 p-0 h-screen w-screen z-50 backdrop-blur-xl" style={{ display: display }}></div>
            <div className='ps:text-sm text-xs absolute bg-pauseGame rounded-2xl w-[190px] ps:rounded-2xl p-4 ps:w-[300px]' style={{ display: display, zIndex: 100, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <div>
                    <p className='text-lg font-bold'>Partie terminée</p>
                    <p className='mb-3'>Vous avez commis {error} erreurs et avez perdu cette partie</p>
                    <div className="">
                        <MyButton onClick={luck} title="Second chance" className="text-secondLuck bg-bgSecondLuck mb-2" />
                    </div>
                    <div className="">
                        <MyButton onClick={click} title="Nouvelle partie" className="text-white bg-blue-500" />
                    </div>
                </div>
            </div>
        </>
    )
}

export const Winner = ({ display, score, time, click }) => {
    return (
        <div>
            <div className="fixed bg-black/30 top-0 left-0 m-0 p-0 h-screen w-screen z-50 backdrop-blur-xl" style={{ display: display }}></div>
            <div className='ps:text-sm text-xs absolute bg-pauseGame rounded-2xl w-[170px] ps:rounded-2xl p-4 ps:w-[250px]' style={{ display: display, zIndex: 100, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <div>
                    <p className='text-lg font-bold'>Partie terminée</p>
                    <p className='mb-2'>Vous avez Gagné</p>
                    <p className='mb-2 font-bold'>Score: {score}</p>
                    <p className='mb-2 font-bold'>Time: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</p>
                    <MyButton title="Nouvelle partie" onClick={click} className="text-white bg-blue-500 dis:w-[170px] dis:text-xs" />
                </div>
            </div>
        </div>
    )
}

export default Message
