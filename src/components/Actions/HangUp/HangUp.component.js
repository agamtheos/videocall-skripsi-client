import React from "react";
import { Tooltip, Button, Modal } from "antd";

import Icon from "../../Icon";

import styled from "./HangUp.module.css";

const Connection = require('../../../classes/Connection');

const HangUp = ({ icon, link }) => {
    const confirm = () => {
        Modal.confirm({
            title: "Akhiri Sesi",
            icon: <Icon name="alert" width={24} height={24} />,
            content:
                "Sesi ini akan berhenti untuk semuanya dan semua aktivitas akan dihentikan. Anda tidak dapat kembali lagi.",
            centered: true,
            width: 320,
            okText: "Akhiri Sesi",
            cancelText: "Batal",
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
