import React from "react"
import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import he from "he"
import {nanoid} from "nanoid"

export default function App() {

  //States 
  const [start, setStart] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [check, setCheck] = React.useState(false)
  const [playAgain, setPlayAgain] = React.useState(0)
  // const [selected, setSelected] = React.useState([])

  //State setters
  function startQuiz() {
    setStart(prevStart => !prevStart)
  }

     
  //Handle API data (Running once)
  function handleQuizData(data) {

    //Local function to shuffle array
    function shuffleArr(arr) {
      let currentInd = arr.length, randomInd;
  
      while (currentInd != 0) {
          randomInd = Math.floor(Math.random() * currentInd);
          currentInd--;
  
          [arr[currentInd], arr[randomInd]] = [arr[randomInd], arr[currentInd]];
      }
  
      return arr;
  
    }


    const questionData = data.results.map(datapoint => {
      let optionsArr = []
      
      for (let i=0; i<datapoint.incorrect_answers.length;i++) {
          optionsArr.push({
            option: he.decode(datapoint.incorrect_answers[i]),
            selected: false,
            id: nanoid()
          })
      }

      optionsArr.push({
        option: he.decode(datapoint.correct_answer),
        selected: false,
        id: nanoid()
        })
      
      optionsArr = shuffleArr(optionsArr)

      return (
          {
              question: {
                q: he.decode(datapoint.question),
                id: nanoid()
              },
              options: optionsArr,
              correctAns: he.decode(datapoint.correct_answer),
              id: nanoid()
          }
      )
    })
    setQuizData(questionData)
  }
  
  //Getting quiz data from API
  React.useEffect(() => {
    fetch ("https://opentdb.com/api.php?amount=5")
    .then (res => res.json())
    .then (data => {
        // console.log(data)
        return handleQuizData(data)
    })
  }, [playAgain])  

  // console.log(quizData)

  function checkAnswers() {
    // let chosen = [];
    // for (let i=0; i<quizData.length;i++) {
    //   for (let j =0; j<quizData[i].options.length;j++) {
    //     if (quizData[i].options[j].selected) {
    //       chosen.push(quizData[i].options[j].option)
    //     }
    //   }

    //   if (chosen[i] === quizData[i].correctAns) {
          
    //   }

    // }

    // console.log(chosen)
    setCheck(true)

}

  function selectOption(questionId, optionId) {
    let modifiedData;
    if (check) {
      modifiedData = quizData 
    }
    else {
      modifiedData = quizData.map(data => {
        if (data.question.id === questionId) {
          const unselectOptionsArr = data.options.map(option => {
            option.selected = false
            return option
          })
          const newOptionsArr = unselectOptionsArr.map(option => {
            if (option.id === optionId) {
              option.selected = !option.selected
            }
            return option
          })
          return (
            {
              ...data,
              options: newOptionsArr
            } 
          )
        }

        else {
          return (
              data
            )
          }
        })
    }
    setQuizData(modifiedData)
  } 

  function nextGame() {
    setPlayAgain (prevPlayAgain => prevPlayAgain + 1)
    setCheck(false)
  }

  //Console logs for debugs
  // React.useEffect(() => console.log(quizData), [quizData])
  // console.log(selected)

  //Render
  return (
    <main className = "main">
      {!start ?
      <StartPage handleClick = {startQuiz}/> :
      <QuestionPage  
      quizData = {quizData} 
      selectOption = {selectOption}
      checkAnswers = {checkAnswers}
      check = {check}
      playAgain = {nextGame}
      />
      }
    </main>
  )
}
