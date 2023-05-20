import React from "react";

import Alert from "./Svgs/Alert";
import Call from "./Svgs/Call";
import Camera from "./Svgs/Camera";
import CameraSlash from "./Svgs/CameraSlash";
import Edit from "./Svgs/Edit";
import Group from "./Svgs/Group";
import Mute from "./Svgs/Mute";
import Phone from "./Svgs/Phone";
import Setting from "./Svgs/Setting";
import SignOut from "./Svgs/SignOut";
import Sound from "./Svgs/Sound";
import User from "./Svgs/User";

import styled from "./Icon.module.css";

const icons = {
    alert: Alert,
    call: Call,
    camera: Camera,
    "camera-slash": CameraSlash,
    edit: Edit,
    group: Group,
    mute: Mute,
    phone: Phone,
    setting: Setting,
    "sign-out": SignOut,
    sound: Sound,
    user: User,
};

const Icon = ({ name, width = 24, height = 24, ...rest }) => {
    const IconComponent = icons[name];

    if (!IconComponent) return null;

    return (
        <div className={styled.icon} style={{ width: width, height: height }}>
            <IconComponent {...rest} />
        </div>
    );
};

export default Icon;
