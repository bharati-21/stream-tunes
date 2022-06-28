import React, { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (videos) => {
	const [pageNumber, setPageNumber] = useState(1);
	const lastElementReference = useRef(null);
	const videosLength = videos?.length;
	const hasMoreVideos = pageNumber <= Math.ceil(videosLength / 5);
	const [loading, setLoading] = useState(false);

	let interval = null;

	const handleObserver = (entries) => {
		const [target] = entries;

		if (target.isIntersecting && hasMoreVideos) {
			setLoading(true);
			interval = setTimeout(() => {
				setLoading(false);
				setPageNumber((prevPageNumber) => prevPageNumber + 1);
			}, 800);
		}
	};

	useEffect(() => {
		const reference = lastElementReference.current;
		const observer = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		if (reference) observer.observe(reference);

		return () => {
			if (interval) clearInterval(interval);
			if (reference) observer.unobserve(reference);
		};
	}, [hasMoreVideos, handleObserver]);

	return { lastElementReference, pageNumber, hasMoreVideos, loading };
};

export { useInfiniteScroll };
