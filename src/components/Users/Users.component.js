import React from "react";
import { Button, Modal } from "antd";

import Icon from "../Icon";
import styled from "./Users.module.css";

const Connection = require('../../classes/Connection');

const Users = ({ data }) => {
    const callerName = localStorage.getItem('username')
    const onClickCall = async(peerName) => {
        const peer = peerName;
        if (!peer) {
            return console.error('You must specify the peer name');
        }
        Modal.confirm({
            title: "Memanggil",
            icon: <Icon name="alert" width={24} height={24} />,
            content:
                "Apakah Anda yakin ingin memanggil " + peer + "?",
            centered: true,
            width: 320,
            okText: "Ya, Panggil",
            cancelText: "Batal",
            onOk: () => {
                Connection.call(callerName, peer);
                localStorage.setItem('me', callerName);
                localStorage.setItem('they', peer);
            },
        });
    }

    return (
        <div className={styled.users}>
            {data.map((user) => (
                <div className={styled.userItem}>
                    {user.imageUrl ? (
                        <img src={""} alt={user.name} />
                    ) : (
                        <span style={{ backgroundColor: `#13c2c2` }}>
                            {user.shortName}
                        </span>
                    )}
                    <p>{user.name}</p>
                    <div className={styled.overlay}>
                        <Button
                            className={styled.callBtn}
                            type="dashed"
                            size="large"
                            icon={
                                <Icon name="call" width={24} height={24} />
                            }
                            ghost
                            onClick={() => onClickCall(user.name)}
                        >
                            Call
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;
