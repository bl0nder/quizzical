import React from "react"
import yellowBlob from "../public/yellowBlob.svg"
import blueBlob from "../public/blueblob.svg"

export default function StartPage(props) {

    return (
        <div className="main--box">
        <img className = "main--blueblob" src = {blueBlob} />
        <div className = "main--info">
          <h1 className = "main--title"> Quizzical </h1>
          <div className="main--description">
            <p>Start quizzing now!</p>
          </div>
          <button 
          className = "main--button" 
          onClick = {props.handleClick}
          >
            Start Quiz
          </button>
        </div>
        <img className = "main--yellowblob" src = {yellowBlob} />
        </div>
    )
}