import React from 'react'

const GAC = ({children}) => {
  return (
    <div className="min-h-screen bg-[url('/bg-magic.png')] bg-cover flex flex-col justify-center items-center p-6 antialiased">{children}</div>
  )
}

export default GAC