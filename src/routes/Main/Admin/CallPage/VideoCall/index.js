import React from "react";
import "../../../../../styles/custom/VideoCall.css"

const VideoCall = ({
	localStream,
	remoteStream,
}) => {
	console.log('HEYY')
	console.log(remoteStream)
	console.log(localStream)
	// useEffect(() => {
	// 	if (localStream) {
	// 		videoRefLocal.current.srcObject = localStream;
	// 		console.log('local stream')
	// 		console.log(localStream)
	// 	}

	// 	if (remoteStream) {
	// 		videoRefRemote.current.srcObject = remoteStream;
	// 		console.log('remote stream')
	// 		console.log(remoteStream)
	// 	}
	// }, [localStream, remoteStream]);

	return (
		<div className="column">
			<div className="column left">
				<div className="remote-video-container">
					<video className="remote-video" id="videoOutput" ref={remoteStream} autoPlay></video>
				</div>
			</div>
			<div id="videoSmall">
				<video className="local-video" id="videoInput" ref={localStream} autoPlay></video>
			</div>
		</div>
	);
};

export default VideoCall;
