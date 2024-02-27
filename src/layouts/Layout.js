import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function Layout() {
    return (
        <>
            <div>
                <div>
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;