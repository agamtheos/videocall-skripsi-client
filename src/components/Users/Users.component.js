import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import Icon from "../Icon";
import {
    register
} from "../../classes/Connection";

import styled from "./Users.module.css";

const Connection = require('../../classes/Connection');

const Users = ({ data }) => {
    const callerName = localStorage.getItem('username')
    const onClickCall = async(peerName) => {
        const peer = peerName;
        if (!peer) {
            return console.error('You must specify the peer name');
        }
        Connection.call(callerName, peer);
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
