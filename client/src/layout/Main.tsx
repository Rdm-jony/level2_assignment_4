import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import { Outlet } from "react-router";

const Main = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Main;