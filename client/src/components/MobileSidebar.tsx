import {
    Drawer,
    DrawerContent,
    DrawerHeader,
} from "@/components/ui/drawer"
import { useState } from "react";
import logo from "@/assets/logo.png"
import { Book, BookCheck, Home, Menu, Save } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";

const MobileSidebar = () => {
    const location = useLocation().pathname
    const [open, setOpen] = useState(false)

    return (
        <div className="md:hidden">
            <div className="w-full border-2 p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10" src={logo} alt="" />
                    <h3 className="text-2xl font-semibold">LIBRARY</h3>
                </div>
                <div className="flex gap-5 items-center">
                    <ModeToggle />
                    <Menu onClick={() => setOpen(!open)} />
                </div>
            </div>
            <Drawer open={open} onOpenChange={setOpen} direction="left">
                <DrawerContent >
                    <DrawerHeader>
                        <div className="flex items-center gap-2 border-b-2 pb-5">
                            <img className="w-10 h-10" src={logo} alt="" />
                            <h3 className="text-2xl font-semibold">LIBRARY</h3>
                        </div>
                    </DrawerHeader>

                    <div className="flex flex-col gap-5 mx-5">
                        <Link onClick={() => setOpen(false)} to="/" className={cn("flex gap-2 items-center", location == '/' ? 'text-sky-600 font-semibold' : '')}> <Home size={20} />Home</Link>
                        <Link onClick={() => setOpen(false)} to="/allBook" className={cn("flex gap-2 items-center", location == '/allBook' ? 'text-sky-600 font-semibold' : '')}><Book size={20} /> All Books</Link>
                        <Link onClick={() => setOpen(false)} to="/addBook" className={cn("flex gap-2 items-center", location == '/addBook' ? 'text-sky-600 font-semibold' : '')}><Save size={20} /> Add Book</Link>
                        <Link onClick={() => setOpen(false)} to="/summery" className={cn("flex gap-2 items-center", location == '/summery' ? 'text-sky-600 font-semibold' : '')}><BookCheck size={20} /> Borrow Summary</Link>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MobileSidebar;
