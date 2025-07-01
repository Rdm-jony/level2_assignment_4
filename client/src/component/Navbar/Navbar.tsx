import logo from "@/assets/logo.png"
import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="border-b-2">
            <div className="flex justify-between max-w-6xl mx-auto py-5">
                <div className="flex">
                    <img src={logo} alt="" />
                    <h3>LIBRARY</h3>
                </div>
                <div className="flex gap-10">
                    <Link to="/">Home</Link>
                    <Link to="/">All Books</Link>
                    <Link to="/">Add Book</Link>
                    <Link to="/">Borrow Summary</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;