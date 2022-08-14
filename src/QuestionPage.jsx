import React from "react"
import { nanoid } from "nanoid"

export default function QuestionPage(props) {
    let count = 0;

    function options(data) { 
        return (data.options.map(option => {
            let styles = {
                backgroundColor: "transparent",
                border: "solid 0.79px #4D5B9E"
            }
            
            if (!props.check) {
                styles = {
                    backgroundColor: option.selected ? "#D6DBF5" : "transparent",
                    border: option.selected ? "solid 0.79px #D6DBF5" : "solid 0.79px #4D5B9E"
                }
            }

            else {

                if (option.option === data.correctAns) {

                    if (option.selected) {
                        count ++;
                    }

                   styles = {
                    backgroundColor: "#94D7A2",
                    border: "solid 0.79px #94D7A2"
                   } 
                }

                else if (option.selected && option.option != data.correctAns) {
                    styles = {
                        backgroundColor: "#F6DADC",
                        border: "solid 0.79px #F6DADC",
                        color: "#8F95B0"
                    }
                }

                else {
                    styles = {
                        backgroundColor: "transparent",
                        border: "solid 0.79px #A1A9CD",
                        color: "#8F9FB0"
                    }
                }
            }

            return (
            <button 
            key = {nanoid()} 
            className="container--button"
            onClick = {() => props.selectOption(data.question.id, option.id)}
            style = {styles}
            > 
                {option.option} 
            </button>
            )
        })
        )
    }

    const elements = props.quizData.map(data => {
        let optionsArr = options(data)    

        return (
            <div key = {data.id} className = "container--quiz"> 
                <p className="container--question"> {data.question.q} </p>
                <div className="container--options">
                    {optionsArr}
                </div>
                <hr className = "container--hr"/>
            </div>        
        )
    })

    let bottomButton;
    if (!props.check) {
        bottomButton = 
        <button className="container--checkAnswers" onClick = {props.checkAnswers}>
            Check Answers
        </button>
    }
    else {
        bottomButton = 
        <div className = "scoreDiv">
            <p className="score">You scored {count}/5 correct answers </p>
            <button className="anotherQuiz" onClick = {props.playAgain}>
            Take another quiz!
            </button>
        </div>
        
    }

    return (
        <div className = "container">
            <div className="container--topmargin"></div>
            {elements}
            <div className = "container--checkButton">
                {bottomButton}
            </div>
        </div>
    )
}
