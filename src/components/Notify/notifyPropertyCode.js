import { toast } from 'react-toastify';

export const notifyToast = (condition, text) => {
    toast[condition] (text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};
