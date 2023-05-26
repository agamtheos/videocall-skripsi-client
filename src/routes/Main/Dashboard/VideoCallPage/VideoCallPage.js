import React, {useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Space, Tooltip } from "antd";

import useToggleState from "../../../../hooks/useToggleState";

import { Layout } from "../../../../components/Layout";
import { HangUp } from "../../../../components/Actions/HangUp";
import { VideoItem } from "../../../../components/VideoItem";
import Icon from "../../../../components/Icon";

import styled from "./VideoCallPage.module.css";

const WebRtcPeerClass = require("../../../../classes/WebRtcPeer");
const WebRtcPeer = new WebRtcPeerClass();

const VideoCallPage = () => {
    const [muted, toggleMuted] = useToggleState(true);
    const [onCam, toggleOnCam] = useToggleState(true);
    const role = localStorage.getItem("role");
    const link = role === "admin" ? "/dashboard/admin/home" : "/dashboard/client/home";

    const findRemoteUserStream = () => {
        const webRtcPeer = WebRtcPeer.getPeers();
        if (!webRtcPeer) {
            return console.log("No remote stream for user ");
        }
        console.log('STREAMM REMOTEEEE')
        console.log(webRtcPeer.getRemoteStream())
        return webRtcPeer.getRemoteStream();
    };

    const findLocalUserStream = () => {
        const wb = WebRtcPeer.getPeers();
        console.log("HAHAHAHHAHAHAHAHAHAHAHAHAHA");
        console.log(wb);
        console.log("HAHAHAHHAHAHAHAHAHAHAHAHAHA");
        const webRtcPeer = WebRtcPeer.getPeers();
        if (!webRtcPeer) {
            return console.log("No local stream for user ");
        }
        const c = webRtcPeer.getLocalStream();
        console.log("HUEHUE");
        console.log(c);
        return c;
    };

    return (
        <Layout
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
                        name="Karen A"
                        isMuted={false}
                        isOnCam={true}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <VideoItem
                        isRemote={false}
                        stream={findLocalUserStream()}
                        image="/assets/img/man.jpg"
                        name="Tyler H"
                        isMuted={muted}
                        isOnCam={onCam}
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
                        className={styled.active}
                        icon={<Icon name="mute" width={32} height={32} />}
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
                        onClick={toggleOnCam}
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
