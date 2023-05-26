import React, {useRef, useEffect} from "react";

import Icon from "../Icon";

import styled from "./VideoItem.module.css";

const VideoItem = ({ isRemote, stream, image, name, isMuted, isOnCam }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.srcObject.getAudioTracks()[0].enabled = true;
        }
	}, [stream]);

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
            <span className={styled.name}>{name}</span>
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
