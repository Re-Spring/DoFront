import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Chatbot from "../components/common/Chatbot";
import Nav from "../components/common/Nav";
function Layout() {
    return (
        <>
            <div>
                <div>
                    <Header />
                    <Nav />
                    <Outlet />
                </div>
                <Chatbot />
                <Footer />
            </div>
        </>
    )
}

export default Layout;