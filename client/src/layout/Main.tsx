import Footer from "@/components/Footer";
import GlobalModel from "@/components/GlobalModel";
import MobileSidebar from "@/components/MobileSidebar";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Main = () => {
    return (
        <>
            <Navbar />
            <MobileSidebar />
            <div className="bg-sky-50 dark:bg-gray-900 lg:pb-20 p-5 pb-20 ">
                <Outlet />
            </div>
            <Footer />
            <GlobalModel />
        </>
    );
};

export default Main;