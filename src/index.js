import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './app/components/hello'


export function initialize(options = {}) {
    ReactDOM.render(<Hello/>, options.target);
}