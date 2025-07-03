import logo from "@/assets/logo.png"
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react"
import { ModeToggle } from "@/components/ui/mode-toggle";

const Navbar = () => {
    const location = useLocation().pathname
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="border-b-2 dark:bg-gray-800">
            <div className="md:flex justify-between hidden items-center max-w-6xl mx-auto py-5">
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10" src={logo} alt="" />
                    <h3 className="text-2xl font-semibold">LIBRARY</h3>
                </div>
                <div className="flex gap-10">
                    <Link to="/" className={cn("flex gap-2 items-center", location == '/' ? 'text-sky-600 font-semibold' : '')}>Home</Link>
                    <Link to="/allBook" className={cn("flex gap-2 items-center", location == '/allBook' ? 'text-sky-600 font-semibold' : '')}>All Books</Link>
                    <Link to="/addBook" className={cn("flex gap-2 items-center", location == '/addBook' ? 'text-sky-600 font-semibold' : '')}>Add Book</Link>
                    <Link to="/summery" className={cn("flex gap-2 items-center", location == '/summery' ? 'text-sky-600 font-semibold' : '')}>Borrow Summary</Link>
                </div>
                <ModeToggle />
            </div>
        </motion.div>
    );
};

export default Navbar;