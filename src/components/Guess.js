import React from 'react'

function Guess({guess, color}) {

   const getProximityText = (value, ref) => {
      if(value == ref) return " ✔️ ";
      else if(value < ref) return " ⬆ ";
      else return " ⬇ ";
   }

   const getRed = () => {
      const red = Math.abs(1 - (Math.abs((guess.red ?? 0) - color.red) / 255).toFixed(2));

      //Construction du gradient avec les valeurs
      return `rgba(255,63,70,${red})`
   }

   const getGreen = () => {
      const green = Math.abs(1 - (Math.abs((guess.green ?? 0) - color.green) / 255).toFixed(2));
      
      //Construction du gradient avec les valeurs
      return `rgba(19,206,102,${green})`
   }

   const getBlue = () => {
      const blue = Math.abs(1 - (Math.abs((guess.blue ?? 0) - color.blue) / 255).toFixed(2));

      //Construction du gradient avec les valeurs
      return `rgba(31,182,255,${blue})`
   }

   return (
      <div className='flex gap-1 flex-row'>
         <div className='h-6 rounded w-6' style={{background: `rgb(${guess.red ?? 0}, ${guess.green ?? 0}, ${guess.blue ?? 0})`}}></div>
         <div className='h-6 rounded flex-1 flex flex-row gap-1'>
            <div className="h-full w-full flex flex-row justify-around rounded" style={{background: getRed()}}>
               <p className='text-white'>{guess.red ?? 0} {getProximityText(guess.red ?? 0, color.red)}</p>
            </div>
            <div className="h-full w-full flex flex-row justify-around rounded" style={{background: getGreen()}}>
               <p className='text-white'>{guess.green ?? 0} {getProximityText(guess.green ?? 0, color.green)}</p>
            </div>
            <div className="h-full w-full flex flex-row justify-around rounded" style={{background: getBlue()}}>
               <p className='text-white'>{guess.blue ?? 0} {getProximityText(guess.blue ?? 0, color.blue)}</p>
            </div>
         </div>
      </div>
  )
}

export default Guess