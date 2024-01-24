import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

const useToast = (msg, status = null) => {
        if(!status){
            toast.success(msg,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick:true,
                theme:"light", 
            });

        } else if(status === "error"){
            toast.error(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "light", 
            });
        }
};


export default useToast;