const findVideoInList = (videos, videoToBeFound) =>
	videos.findIndex((video) => video._id === videoToBeFound._id) !== -1;

export { findVideoInList };
