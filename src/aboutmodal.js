import React from 'react'
import ReactDom from 'react-dom'
import closebutton from './images/close-button.png'

const Aboutmodal = ({ show, closeModal }) => {
    if (!show) return null;

    return ReactDom.createPortal(
        <>
            <div className="dimback"></div>
            <div className="aboutback about zoomin">
                <img src={closebutton} className="aboutClose" alt="close window" onClick={() => closeModal(false)}/>
                <h1>About</h1>
                <p>Hi! <br></br><br></br> I'm a website made by Iggy Villa using React and Google Firebase. All icons were from <a href="https://icons8.com/" target="_blank" rel="noreferrer">icons8.com</a>!
                The words update real-time with new words added from the discord bot. Magic of technology :)</p>
            </div>
            
        </>, document.getElementById("about")
    )
    
}

export default Aboutmodal
