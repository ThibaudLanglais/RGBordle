import { useEffect, useRef, useState } from "react";
import Guess from "./components/Guess";
import MyDialog from "./components/MyDialog";
import party from "party-js";
import moment from "moment/moment";
import HelpModal from "./components/HelpModal";

const maxTries = 8;

export default function App() {

  const [color, setColor] = useState(null);
  const [hasWon, setHasWon] = useState(null);
  const container = useRef();
  const helpRef = useRef();

  //Fields
  const [red, setRed] = useState();
  const [green, setGreen] = useState();
  const [blue, setBlue] = useState();

  //Guesses
  const [guesses, setGuesses] = useState([]);

  useEffect(()=>{
   init(); 
  }, [])

  function init(reset){
    const newColor = {red: Math.floor(Math.random() * 256), green: Math.floor(Math.random() * 256), blue: Math.floor(Math.random() * 256)};
    const lastGameAt = localStorage.getItem('lastGameAt');
    const fromStorage = localStorage.getItem('color');
    const guessesFromStorage = localStorage.getItem('guesses');
    const hasWonFromStorage = localStorage.getItem('hasWon');

    if(!reset && fromStorage && lastGameAt && guesses !== null && hasWonFromStorage !== null){
      const daysSinceLast = moment(new Date()).diff(moment(JSON.parse(lastGameAt)), 'days');
      if(daysSinceLast >= 1){
        localStorage.setItem('color', JSON.stringify(newColor));
        localStorage.setItem('lastGameAt', JSON.stringify(new Date().getTime()))
        localStorage.setItem('guesses', JSON.stringify(guesses));
        setColor(newColor);
      }else{
        setColor(JSON.parse(fromStorage));
        setGuesses(JSON.parse(guessesFromStorage))
        setHasWon(JSON.parse(hasWonFromStorage));
      }
    }
    else {
      localStorage.setItem('lastGameAt', JSON.stringify(new Date().getTime()))
      localStorage.setItem('color', JSON.stringify(newColor));
      localStorage.setItem('guesses', JSON.stringify([]));
      localStorage.setItem('hasWon', false);
      setColor(newColor);
      setGuesses([]);
      setRed('');
      setGreen('');
      setBlue('');
      setHasWon(null);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(maxTries - guesses.length !== 0)
    {
      if(red == color.red && green == color.green && blue == color.blue) setHasWon(true)
      else if(maxTries - guesses.length === 1) setHasWon(false)
      const newGuesses = [...guesses, {
        red: red,
        green: green,
        blue: blue
      }];

      setGuesses(newGuesses)
      localStorage.setItem('guesses', JSON.stringify(newGuesses))
    }
  }

  useEffect(() => {
    if(hasWon !== null){
      localStorage.setItem('hasWon', hasWon);
      if(hasWon && container.current){
        party.confetti(container.current, {
            count: party.variation.range(20, 40),
        });
      }
    }
  }, [hasWon])
  
  if(!color) return <h1>Loading...</h1>
  return (
    <div ref={container} className="bg-dark w-screen h-screen sm:p-4 flex justify-center">
      <HelpModal ref={helpRef}/>
      {(maxTries - guesses.length === 0 || hasWon) && <MyDialog color={color} success={hasWon === true}/>}
      <div className="lg:w-600 md:w-480 p-4 rounded shadow h-full bg-white flex flex-col">
        <div className="flex flex-row justify-between mb-3 items-center">
          <p className="font-black text-3xl">RGBordle 🎨</p>
          <button onClick={() => helpRef.current?.open()} className="text-3xl">❓</button>
        </div>
        <div style={{backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue}`}} className="w-full h-60 rounded flex justify-center items-center">
        </div>
        <p className="mt-2 mb-4">Try and guess the three components <span className="font-regular text-red">red</span>, <span className="font-regular text-green">green</span> and <span className="font-regular text-blue">blue</span>.</p>
        {guesses.length !== 0 && <div className="flex flex-col gap-1">
          {guesses.map((guess, i) => <Guess key={i} guess={guess} color={color}/>)}
        </div>}
        { (maxTries-guesses.length !== 0 && !hasWon) &&
          <p className="w-full my-2">
            <span className="font-bold">{maxTries-guesses.length}</span>
            {maxTries-guesses.length === 1 ? ' try ' : ' tries '}
            remaining 
            {maxTries-guesses.length > 4 ? ' 😎 ' : maxTries - guesses.length > 2 ? ' 🤨 ' : ' 😱 '}
          </p>
        }
        <form onSubmit={handleSubmit} className="flex flex-1 flex-row gap-2 mt-4 flex-wrap">
          <div className="flex flex-row w-full !sm:grid grid-cols-3 gap-2">
          <input step={1} value={red} onChange={({target}) => setRed(formatValue(target.value))} required className="shadow h-10 p-2 rounded w-full text-red" placeholder="red" type="number" min={0} max={255}/>
          <input step={1} value={green} onChange={({target}) => setGreen(formatValue(target.value))} required className="shadow h-10 p-2 rounded w-full text-green" placeholder="green" type="number" min={0} max={255}/>
          <input step={1} value={blue} onChange={({target}) => setBlue(formatValue(target.value))} required className="shadow h-10 p-2 rounded w-full text-blue" placeholder="blue" type="number" min={0} max={255}/>
          </div>
          <button className={`${(hasWon || maxTries-guesses.length === 0) && 'hidden'} hover:translate-y-0.5 transition-transform mt-auto w-full py-4 rounded shadow text-md bg-dark text-white`} type="submit">
            Guess the color
            <span className="text-xl"> 🕵️‍♀️</span>
          </button>
          {(hasWon || maxTries-guesses.length === 0) && <button onClick={() => init(true)} className="hover:translate-y-0.5 transition-transform mt-auto w-full py-4 rounded shadow text-md bg-dark text-white" type="button">
            Play again
            <span className="text-xl"> 🔥</span>
          </button>}
        </form>
      </div>
    </div>
  );
}

function formatValue(value){
  if(value < 0) return 0;
  else if(value > 255) return 255;
  return value;
}
