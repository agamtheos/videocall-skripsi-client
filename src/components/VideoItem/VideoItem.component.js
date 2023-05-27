import React, {useRef, useEffect} from "react";

import Icon from "../Icon";

import styled from "./VideoItem.module.css";

const VideoItem = ({ isRemote, stream, image, name, isMuted, isOnCam }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (stream) {
            console.log('RENEEE')
            videoRef.current.srcObject = stream;
            videoRef.current.srcObject.getAudioTracks()[0].enabled = true;
        }

        if (isMuted) {
            videoRef.current.srcObject.getAudioTracks()[0].enabled = !videoRef.current.srcObject.getAudioTracks()[0].enabled
            console.log('muted')
        }
        if (!isMuted) {
            videoRef.current.srcObject.getAudioTracks()[0].enabled = videoRef.current.srcObject.getAudioTracks()[0].enabled
            console.log('unmuted')
        }
        // if (!isOnCam) {
        //     if (isRemote) {
        //         videoRef.current.srcObject.getVideoTracks()[0].enabled = !videoRef.current.srcObject.getVideoTracks()[0].enabled
        //         console.log('cam off')
        //     }
        //     if (!isRemote) {
        //         videoRef.current.srcObject.getVideoTracks()[0].enabled = videoRef.current.srcObject.getVideoTracks()[0].enabled
        //         console.log('cam on')
        //     }
        //     // videoRef.current.srcObject.getVideoTracks()[0].enabled = !videoRef.current.srcObject.getVideoTracks()[0].enabled
        //     // // setMuted(true)
        //     // console.log('cam off')
        // }
	}, [isMuted, stream]);

    return (
        <div className={styled.videoItem}>
            {isOnCam ? (
                // <img src={image} alt={name} />
                // make condition for isRemote
                isRemote ? (
                    <video ref={videoRef} autoPlay></video>
                ) : (
                    <video ref={videoRef} autoPlay muted></video>
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
