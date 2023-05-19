import React, {useRef, useEffect} from "react";

import "../../../../../styles/custom/VideoCall.css"

const VideoCall = ({
	localStream,
	remoteStream,
}) => {
	const videoRefLocal = useRef(null);
	const videoRefRemote = useRef(null);
	console.log('HEYY')
	console.log(remoteStream)
	console.log(localStream)
	useEffect(() => {
		if (localStream) {
			videoRefLocal.current.srcObject = localStream;
			// remove audio from local stream
			videoRefLocal.current.srcObject.getAudioTracks()[0].enabled = true;
			console.log('local stream')
			console.log(localStream)
		}

		if (remoteStream) {
			videoRefRemote.current.srcObject = remoteStream;
			videoRefRemote.current.srcObject.getAudioTracks()[0].enabled = true;
			console.log('remote stream')
			console.log(remoteStream)
		}
	}, [localStream, remoteStream]);

	return (
		<div className="column">
			<div className="column left">
				<div className="remote-video-container">
					<video className="remote-video" id="videoOutput" ref={videoRefRemote} autoPlay></video>
				</div>
			</div>
			<div id="videoSmall">
				<video className="local-video" id="videoInput" ref={videoRefLocal} autoPlay muted></video>
			</div>
		</div>
	);
};

export default VideoCall;
