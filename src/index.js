import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyApp from './App';
import reportWebVitals from './reportWebVitals';

function Header() {
  return (<div className="header">
    <div className="header-title">
      <span className='text'>Trình quản lý</span>
    </div>
  </div>)
}

function Footer() {
  return (<div className="footer">
    <div className="footer-element">
    </div>
  </div>)
}

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <MyApp/>
    <Footer/>
  </React.StrictMode>
  ,document.getElementById('root')
);
reportWebVitals();
