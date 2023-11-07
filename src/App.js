import "./App.css";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                {/* <Search /> */}
                <Pages />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
