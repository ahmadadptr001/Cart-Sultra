import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css"

// komponen primereact tools
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// redux punya nih bos
import { Provider } from "react-redux";
import { store } from "./config/store";
import Cart from "./pages/Cart";

const app = () => {
        return (
                <Provider store={store}>
                        <Router>
                                <Routes>
                                        <Route path="/" element={<Home />}></Route>
                                        <Route path="/cart" element={<Cart />}></Route>
                                </Routes>
                        </Router>
                </Provider>
        )
}

export default app