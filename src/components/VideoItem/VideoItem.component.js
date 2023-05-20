import React from "react";

import Icon from "../Icon";

import styled from "./VideoItem.module.css";

const VideoItem = ({ image, name, isMuted, isOnCam }) => {
    return (
        <div className={styled.videoItem}>
            {isOnCam ? (
                <img src={image} alt={name} />
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
