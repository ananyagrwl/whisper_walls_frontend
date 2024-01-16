import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Home } from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { Provider } from "react-redux";
import Store from "./redux/Store";

const App = () => {
  return (
    <Provider store={Store}>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App;
