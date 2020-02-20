import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app'

const render = () => ReactDOM.render(
  <App />, 
  document.getElementById('PoeticAgencyImageAnnotations')
)

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded', 
    render
  )

} else {

  render();
}
