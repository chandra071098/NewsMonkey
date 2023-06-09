import React from 'react'
import spinner from './Spinner-2.gif'

const loading=()=> {
    return (
      <div className='text-center'>
        <img src={spinner} alt="loading" />
      </div>
    )

}

export default loading
