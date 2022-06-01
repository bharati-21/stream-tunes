import React, { useEffect } from "react";

const useOutsideClick = (reference, handler) => {
	const handleOutsideClick = (event) => {
		if (
			reference.current &&
			(event.target === reference.current ||
				reference.current.cont
                ains(event.target))
		) {
			return;
		}
		if (handler) handler();
	};
	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, []);
};

export { useOutsideClick };
