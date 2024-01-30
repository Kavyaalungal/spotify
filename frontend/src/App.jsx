import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import { Provider } from 'react-redux'
import store from './components/states/Store'
import { AppProvider } from './components/states/Content'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Search from "./components/Search/Search";

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/search" element={<Search />} />
      </Routes>
      
    </Router>
    <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </AppProvider>
    </Provider>
  )
}

export default App
