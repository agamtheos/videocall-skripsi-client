import React from "react";
import { useHistory } from "react-router-dom";
import { Tooltip, Button, Modal } from "antd";

import Icon from "../../Icon";

import styled from "./HangUp.module.css";

const HangUp = ({ icon }) => {
    const history = useHistory();

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
                history.push("/dashboard/test1/room");
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
