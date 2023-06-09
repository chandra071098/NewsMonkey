import React, { Component } from 'react'
import spinner from './Spinner-2.gif'

export class loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt="loading" />
      </div>
    )
  }
}

export default loading
