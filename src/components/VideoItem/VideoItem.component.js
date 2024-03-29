import React, {useRef, useEffect} from "react";

import Icon from "../Icon";

import styled from "./VideoItem.module.css";

const VideoItem = ({ isRemote, stream, image, name, isMuted, isOnCam, control }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (stream) {
            console.log('INI PUNYA STREAM Remote', isRemote)
            console.log('RENEEE')
            console.log(stream)
            videoRef.current.srcObject = stream[0] ? stream[0] : stream;
            console.log(videoRef.current.srcObject)
            // videoRef.current.srcObject = stream;
            // videoRef.current.srcObject.getAudioTracks()[0].enabled = true;
        }

        if (isMuted) {
            videoRef.current.srcObject.getAudioTracks()[0].enabled = false
            console.log('muted')
        }
        if (!isMuted) {
            videoRef.current.srcObject.getAudioTracks()[0].enabled = true
            console.log('unmuted')
        }
        if (!isOnCam) {
            // console.log(videoRef.current.srcObject.getVideoTracks()[0])
            videoRef.current.srcObject.getVideoTracks()[0].enabled = !(videoRef.current.srcObject.getVideoTracks()[0].enabled)
            console.log('offcam')
        }
        if (isOnCam) {
            // console.log(videoRef.current.srcObject.getVideoTracks()[0])
            videoRef.current.srcObject.getVideoTracks()[0].enabled = (videoRef.current.srcObject.getVideoTracks()[0].enabled)
            console.log('oncam')
        }
	}, [isMuted, isOnCam, stream]);

    return (
        <div className={styled.videoItem}>
            {isOnCam ? (
                // <img src={image} alt={name} />
                // make condition for isRemote
                isRemote ? (
                    <video ref={videoRef} autoPlay={true} playsInline={true}></video>
                ) : (
                    <video ref={videoRef} autoPlay={true} muted={true} playsInline={true}></video>
                )
            ) : (
                <div
                    className={styled.avatar}
                    style={{ backgroundColor: "#1890ff" }}
                >
                    TH
                </div>
            )}
            {isRemote ? (
                <span className={styled.name}>{name}</span>
            ) : (
                <span className={styled.name}>{name} (You)</span>
            )}
            {isMuted ? (
                <span className={styled.muted}>
                    <Icon name="mute" width={24} height={24} />
                </span>
            ) : (
                ""
            )}
        </div>
    );
};

export default VideoItem;
