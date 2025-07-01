import Footer from "@/component/Footer/Footer";
import Navbar from "@/component/Navbar/Navbar";
import { Outlet } from "react-router";

const Main = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Main;