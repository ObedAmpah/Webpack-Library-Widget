import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './app/components/hello'
import MyForm from './form/components/MyForm'


export function initialize(options = {}) {
    ReactDOM.render(<MyForm/>, options.target);
}