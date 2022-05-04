import { PlaylistModal } from "components";
import ReactDOM from "react-dom";

const PlaylistPortal = ({ video, setShowPlaylistModal }) => {
	return ReactDOM.createPortal(
		<PlaylistModal
			video={video}
			setShowPlaylistModal={setShowPlaylistModal}
		/>,
		document.getElementById("modal")
	);
};

export default PlaylistPortal;
