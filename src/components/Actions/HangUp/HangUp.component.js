import React from "react";
import { Tooltip, Button, Modal } from "antd";

import Icon from "../../Icon";

import styled from "./HangUp.module.css";

const Connection = require('../../../classes/Connection');

const HangUp = ({ icon, link }) => {
    const confirm = () => {
        Modal.confirm({
            title: "End Session",
            icon: <Icon name="alert" width={24} height={24} />,
            content:
                "The session will end for everyone and all the activities will stop. You can’t undo this action.",
            centered: true,
            width: 320,
            okText: "End Session",
            cancelText: "Don't End",
            onOk: () => {
                window.location.replace(link);
                Connection.stop();
                localStorage.removeItem('caller');
                localStorage.removeItem('callee');
            },
        });
    };

    return (
        <Tooltip title="Hang Up">
            <Button
                className={styled.button}
                type="primary"
                icon={icon}
                size="large"
                onClick={confirm}
                danger
            />
        </Tooltip>
    );
};

export default HangUp;
