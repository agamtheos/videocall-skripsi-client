import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Space, Tooltip } from "antd";
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";

import useToggleState from "../../../../hooks/useToggleState";

import { Layout } from "../../../../components/Layout";
import { HangUp } from "../../../../components/Actions/HangUp";
import { VideoItem } from "../../../../components/VideoItem";
import Icon from "../../../../components/Icon";

import styled from "./VideoCallPage.module.css";

const WebRtcPeerClass = require("../../../../classes/WebRtcPeer");
const WebRtcPeer = new WebRtcPeerClass();

const VideoCallPage = () => {
    const [muted, toggleMuted] = useToggleState(false);
    const [onCam, toggleOnCam] = useToggleState(true);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const role = localStorage.getItem("role");
    const link = role === "admin" ? "/dashboard/admin/home" : "/dashboard/client/home";
    const me = localStorage.getItem("me");
    const they = localStorage.getItem("they");
    let remoteStream = null;
    let localStream = null;

    const findRemoteUserStream = () => {
        if (isFirstTime) {
            const webRtcPeer = WebRtcPeer.getPeers();
            if (!webRtcPeer) {
                return console.log("No remote stream for user ");
            }
            console.log('STREAMM REMOTEEEE')
            let stream = null;
            try {
                stream = webRtcPeer.getRemoteStreams();
                console.log('using old method')
                console.log(stream)
            } catch (e) {
                console.log('using new method')
                stream = new MediaStream();
                webRtcPeer.getReceivers().forEach(function(receiver) {
                    stream.addTrack(receiver.track);
                    // stream = receiver.track;
                })
                console.log(stream)
                return [stream]
            }
            remoteStream = stream;
            return stream;
        }

        if (!isFirstTime) {
            console.log('STREAMM REMOTEEEE')
            console.log(remoteStream)
            return remoteStream;
        }
        
    };

    const findLocalUserStream = () => {
        if (isFirstTime) {
            const webRtcPeer = WebRtcPeer.getPeers();
            if (!webRtcPeer) {
                return console.log("No local stream for user ");
            }
            let stream = null;
            try {
                stream = webRtcPeer.getLocalStreams();
                console.log('using old method')
                console.log(stream)
            } catch (e) {
                console.log('using new method')
                stream = new MediaStream();
                webRtcPeer.getSenders().forEach(function(sender) {
                    console.log('add track')
                    stream.addTrack(sender.track);
                });
                console.log(stream)
                return [stream];
            }
            localStream = stream;
            return stream;
        }
        
        if (!isFirstTime) {
            console.log('STREAMM LOCALLLL')
            console.log(localStream)
            return localStream;
        }
    };

    const handleToggleCam = () => {
        toggleOnCam();
        setIsFirstTime(false);
    }

    const handleToggleCamLocalStream = () => {
        const webRtcPeer = WebRtcPeer.getPeers();
        if (!webRtcPeer) {
            return console.log("No local stream for user ");
        }
        const localStream = webRtcPeer.getLocalStreams()[0];
        const videoTrack = localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
    };

    const handleToggleCamRemoteStream = () => {
        const webRtcPeer = WebRtcPeer.getPeers();
        if (!webRtcPeer) {
            return console.log("No remote stream for user ");
        }
        const remoteStream = webRtcPeer.getRemoteStreams()[0];
        const videoTrack = remoteStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
    };

    // useEffect(() => {
    //     if (!onCam) {
    //         handleToggleCamLocalStream();
    //     }
    // }, []);

    return (
        <Layout
            link={link}
            me={me}
            they={they}
            isVideoCall
            rightSection={
                <Link to={link}>
                    <Button
                        icon={<Icon name="group" width={32} height={32} />}
                        ghost
                    >
                        2
                    </Button>
                </Link>
            }
        >
            <Row
                gutter={[
                    { xs: 0, sm: 0, md: 24, lg: 32 },
                    { xs: 16, sm: 20, md: 24, lg: 32 },
                ]}
            >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <VideoItem
                        isRemote={true}
                        stream={findRemoteUserStream()}
                        image="/assets/img/woman.jpg"
                        name={they}
                        isMuted={false}
                        isOnCam={true}
                        // control={isControlled}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <VideoItem
                        isRemote={false}
                        stream={findLocalUserStream()}
                        image="/assets/img/man.jpg"
                        name={me}
                        isMuted={muted}
                        isOnCam={onCam}
                        // control={}
                    />
                </Col>
            </Row>
            <Space
                className={styled.actions}
                align="center"
                direction="horizontal"
                size={24}
                wrap
            >
                <Tooltip title={muted ? "Unmute Voice" : "Mute Voice"}>
                    <Button
                        // className={styled.active}
                        icon={muted ? <AudioMutedOutlined /> : <AudioOutlined />}
                        // icon={<Icon name={muted ? "mute" : "unmute"} width={32} height={32}/>}
                        size="large"
                        onClick={toggleMuted}
                    />
                </Tooltip>
                <Tooltip title={onCam ? "Turn Off Camera" : "Turn On Camera"}>
                    <Button
                        icon={
                            <Icon
                                name={onCam ? "camera" : "camera-slash"}
                                width={32}
                                height={32}
                            />
                        }
                        size="large"
                        onClick={handleToggleCam()}
                    />
                </Tooltip>
                <div className="ant-lg-only">
                    <HangUp
                        link={link}
                        icon={<Icon name="phone" width={32} height={32} />}
                    />
                </div>
            </Space>
        </Layout>
    );
};

export default VideoCallPage;
