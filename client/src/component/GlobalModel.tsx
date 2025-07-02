import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { closeModal, selectIsModalOpen, selectModalType } from "@/redux/modalSlice";
import EditBook from "./EditBook";

const GlobalModel = () => {
    const dispatch=useAppDispatch()
    const isOpen=useAppSelector(selectIsModalOpen)
    const type=useAppSelector(selectModalType)
    
    const handleOnChange=()=>dispatch(closeModal())

    let content:React.ReactNode=null

    if(isOpen && type=="edit"){
       content= <EditBook/>
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOnChange}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    );
};

export default GlobalModel;