import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const GlowLinkGAC = ({id, children, ...props}) => {
        const [ glowIt, setGlowIt ] = useState("");
  return (
    <Link
        id={id}
		onMouseOver={(e) => setGlowIt(e.target.id)}
		onMouseLeave={() => setGlowIt("")}
		className={`w-auto my-2 cursor-pointer bg-blue-dragon/90 border-mana border-2 rounded-lg p-5 hover:border-arcane-spell text-left ${glowIt === id ? "animate-pulseGlow" : ""}`}
		{...props}
        >{children}</Link>
  )
}

export default GlowLinkGAC