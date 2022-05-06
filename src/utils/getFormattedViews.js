const getFormattedViews = (views) => {
	if (views < 1000) return views;

	else if (views >= 1000 && views < 1000000)
		return (views / 1000).toFixed(1).replace(".0", "") + "K";

	else if (views >= 1000000 && views < 1000000000)
		return (views / 1000000).toFixed(1).replace(".0", "") + "M";

	else if (views >= 1000000000)
		return (views / 1000000000).toFixed(1).replace(".0", "") + "B";
};

export { getFormattedViews };