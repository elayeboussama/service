import React from 'react'
import svg from "../python.svg"
import "../styles/components/Title.css"

function Title() {
  return (
    <div className='Title'>
      <div className='language'>
      <img src={svg}/>
      <h2> python </h2>
      </div>
      
      <p>in this course you will learn python steps by steps inclusing variables loops for conditions functions mmicroservices milan juventus inter bayern or chelsea germany bundesliga und alles fur feute oder alles oder nicht </p>
    </div>
  )
}

export default Title