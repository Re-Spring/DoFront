import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Chatbot from "../components/common/Chatbot";
function Layout() {
    return (
        <>
            <div>
                <div>
                    <Header />
                    <Outlet />
                    <Chatbot />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;