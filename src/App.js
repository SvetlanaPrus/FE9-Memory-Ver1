import './App.css';
import React, {useState,useEffect} from 'react';
import CardsTable from "./CardsTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apple from '../src/images/apple.png';
import Kiwi from '../src/images/kiwi.png';
import Orange from '../src/images/orange.png';
import Pineapple from '../src/images/pineapple.png';
import Plum from '../src/images/plum.png';
import Watermellom from '../src/images/watermellon.png';

// Comment: working version, Ok. Can be improved in the future.

function App() {

  const images = [
    <img src={Apple} alt={"apple"}/>,
    <img src={Kiwi} alt={"apple"}/>,
    <img src={Orange} alt={"apple"}/>,
    <img src={Pineapple} alt={"apple"}/>,
    <img src={Plum} alt={"apple"}/>,
    <img src={Watermellom} alt={"apple"}/>,
  ];

  const [cards, setCards] = useState([
    {id: 1, image:null, open:false},
    {id: 2, image: null, open:false},
    {id: 3, image: null, open:false},
    {id: 4, image:null, open:false},
    {id: 5, image:null, open:false},
    {id: 6, image:null, open:false},
    {id: 7, image:null, open:false},
    {id: 8, image: null, open:false},
    {id: 9, image:null, open:false},
    {id: 10, image:null, open:false},
    {id: 11, image:null, open:false},
    {id: 12, image:null, open:false}
  ])
// ******************************** Creating a first closed cards set *********************
  function createCards() {
    const newCards = [...cards];
    for (let i = 0; i < images.length; i++) {
      for (let num = 1; num <= 2; num++) {
        let j = Math.floor(Math.random() * 12);
        if (newCards[j].image === null) {
          newCards[j].image = images[i];
        } else {
          while (newCards[j].image !== null) {
            j = Math.floor(Math.random() * 12)
            if (newCards[j].image === null) {
              newCards[j].image = images[i];
              break;
            }
          }
        }
      }
    }
    setCards(newCards);
  }
// ************************************* We open card ******************************

  const [notedImg, setNotedImg] = useState([]);                     //remember image
  const [notedId, setNotedId] = useState([]);                       //remember id.number
  const [counter, setCounter] = useState(0);                        //two cards counter
  const [stepControl, setStepControl] = useState(0);                //steps calculations
  const [textOn, setTextOn] = useState(false)                       //rendering result

  function openCards(id){
    let rememberImage = null;
    const newSet = cards.map(el => {
          if (el.id === id) {
            rememberImage = el.image;
            return {...el, open: true}
          } else {
            return el;
          }
        })
    if (cards.filter(el => el.open === false).length === 1) setTextOn(!textOn);
    setCounter(counter+1)
    if (cards.filter(el => el.open === false).length !== 0) setStepControl(stepControl+1)
    setCards(newSet);
    setNotedImg([...notedImg, rememberImage]);
    setNotedId([...notedId, id])
  }

// ***************************************** Check if cards are identical *********************

  function checkCount(){
    if (counter !== 0 && counter % 2 === 0){
      if (notedImg[notedImg.length-1] !== notedImg[notedImg.length-2]){
        let newSet = cards.map(el => {
          if (el.id === notedId[notedId.length-1] || el.id === notedId[notedId.length-2]){
            return {...el, open: false}
          } else { return el}
        })
        setCards(newSet)
      }
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      checkCount()
    }, 1000)
  }, [counter])


  // function startAgain(){
  //   setCounter(0)
  //   setStepControl(0)
  //   setCards([])
  //   setNotedImg([])
  //   setNotedId([])
  //   {createCards()}
  // }

  return (
    <div className="container align-items-center m-4">
      <h1> Memory Game - Ver.1 </h1>
      <div className="row">
        <div className="col-0">
          {
            cards[0].image !== null?
                <button disabled={true} type="button" className="notActive"> Start</button>
                : <button type="button" className="active" onClick={createCards}> Start </button>
          }
        </div>
        <div className="col-5 mt-4">
          {textOn && <h5 className="h5"> You finished with {stepControl} steps.<br/> Congratulations! </h5>}
        </div>
      </div>
      <CardsTable cards={cards} openCards={openCards}/>
    </div>
  );
}

export default App;
