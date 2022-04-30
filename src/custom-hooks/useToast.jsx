import { toast } from "react-toastify";

const useToast = () => {
	const showToast = (toastText="Operation Successfull", toastTheme="success") => {
        console.log(toastText, toastTheme)
        
		const notify = () => {
			toast[toastTheme](toastText, {
                theme: "colored",
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		};
		notify();
	};

	return { showToast };
};

export { useToast };