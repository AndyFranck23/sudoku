// import { css } from '@emotion/core'
import React from 'react'
import viteLogo from '/vite.svg'
import '../App.css'


export const MyButton = ({ BackgroundColor, Color, title, handleClick, width, className }) => {
    return (
        <div className={className}>
            <button
                className={className == "btn" ? "" : "pa"}
                style={{ background: BackgroundColor, color: Color, width: width }}
                onClick={handleClick}
            >
                {title}
            </button>
        </div>
    )
}

export const Calendrier = () => {
    return (
        <div className="calendrier">
            <div className="logoCalendrier">
                <img src={viteLogo} alt="" />
            </div>
            <div className="nomCalendrier">
                <p> DEFI QUOTIDIEN</p>
            </div>
            <div className="date">
                <p>9 septembre</p>
            </div>
            <div className="btnJouer">
                <button>Jouer</button>
            </div>
        </div>
    )
}

export const Title = () => {
    return (
        <div className="titre">
            <legend>Sudoku<span style={{ color: 'rgb(83, 83, 247)', fontWeight: '700' }}>.</span>com</legend>
        </div>
    )
}

export const Footer = () => {
    return (
        <footer className="navBarBottom">
            <button>Accueil</button>
            <button>Défis quotidiens</button>
            <button>Statistique</button>
        </footer>
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
