import React, { useState } from 'react'

const GlowButtonGAC = ({id, onClick, children}) => {
	const [ glowIt, setGlowIt ] = useState("");
  return (
	<button
		id={id}
		onMouseOver={(e) => setGlowIt(e.target.id)}
		onMouseLeave={() => setGlowIt("")}
		className={`w-auto my-2 cursor-pointer bg-blue-dragon/90 border-mana border-2 rounded-lg p-5 hover:border-arcane-spell text-left ${glowIt === id ? "animate-pulseGlow" : ""}`}
		onClick={onClick}
	>

		{children}
	</button>
  )
}

export default GlowButtonGAC