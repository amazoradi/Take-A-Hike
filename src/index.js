import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import TakeAHike from './components/TakeAHike'
import './index.css'
import './semantic/dist/semantic.min.css'


ReactDOM.render(
  <Router>
    <TakeAHike />
  </Router>
  , document.getElementById('root'));


