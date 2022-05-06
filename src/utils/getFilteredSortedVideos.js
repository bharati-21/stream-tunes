const getFilteredSortedVideos = (
	videos,
	searchText,
	filterCategory,
	sortBy
) => {
	const videosFilteredBySearchText = getVideosFilteredBySearchText(
		videos,
		searchText
	);
	const videosFilteredByCategory = getVideosFilteredByCategory(
		videosFilteredBySearchText,
		filterCategory
	);
	const videosSortedByDate = getVideosSortedByDate(
		videosFilteredByCategory,
		sortBy
	);

	return videosSortedByDate;
};


export { getFilteredSortedVideos };

const getVideosFilteredBySearchText = (videos, searchText) =>
	!searchText
		? videos
		: videos.filter((video) =>
				video.title.toLowerCase().includes(searchText.toLowerCase())
		  );

const getVideosFilteredByCategory = (
	videosFilteredBySearchText,
	filterCategory
) =>
	filterCategory === "All"
		? videosFilteredBySearchText
		: videosFilteredBySearchText?.filter(
				(video) => video.categoryName === filterCategory
		  );

const getVideosSortedByDate = (videosFilteredByCategory, sortBy) =>
	!sortBy
		? videosFilteredByCategory
		: [...videosFilteredByCategory].sort((videoOne, videoTwo) => {
				switch (sortBy) {
					case "LATEST":
						return (
							new Date(videoTwo.dateAdded) -
							new Date(videoOne.dateAdded)
						);
					case "OLDEST":
						return (
							new Date(videoOne.dateAdded) -
							new Date(videoTwo.dateAdded)
						);
				}
		  });
