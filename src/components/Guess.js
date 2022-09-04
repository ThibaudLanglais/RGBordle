import React from 'react'

function Guess({guess, color}) {

   const getProximityText = (value, ref) => {
      if(value == ref) return " ✔️ ";
      else if(value < ref) return " ⬆ ";
      else return " ⬇ ";
   }

   const getGradient = () => {
      const red = Math.abs(1 - (Math.abs((guess.red ?? 0) - color.red) / 255).toFixed(2));
      const green = Math.abs(1 - (Math.abs((guess.green ?? 0) - color.green) / 255).toFixed(2));
      const blue = Math.abs(1 - (Math.abs((guess.blue ?? 0) - color.blue) / 255).toFixed(2));

      //Construction du gradient avec les valeurs
      return `
         linear-gradient(90deg, 
            rgba(255,63,70,${red}) 0%, 
            rgba(255,63,70,${red}) 25%, 
            rgba(19,206,102,${green}) 40%, 
            rgba(19,206,102,${green}) 60%, 
            rgba(31,182,255,${blue}) 75%, 
            rgba(31,182,255,${blue}) 100%)
      `
   }

   return (
      <div className='flex gap-1 flex-row'>
         <div className='h-6 rounded w-6' style={{background: `rgb(${guess.red ?? 0}, ${guess.green ?? 0}, ${guess.blue ?? 0})`}}>

         </div>
         <div className='h-6 rounded shadow bg-dark flex-1'>
            <div className="h-full w-full flex flex-row justify-around" style={{background: getGradient()}}>
               <p className='text-white'>{guess.red ?? 0} {getProximityText(guess.red ?? 0, color.red)}</p>
               <p className='text-white'>{guess.green ?? 0} {getProximityText(guess.green ?? 0, color.green)}</p>
               <p className='text-white'>{guess.blue ?? 0} {getProximityText(guess.blue ?? 0, color.blue)}</p>
            </div>
         </div>
      </div>
  )
}

export default Guess