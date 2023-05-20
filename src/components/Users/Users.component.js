import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import Icon from "../Icon";

import styled from "./Users.module.css";

const Users = ({ data }) => {
    return (
        <div className={styled.users}>
            {data.map((user) => (
                <div className={styled.userItem}>
                    {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.name} />
                    ) : (
                        <span style={{ backgroundColor: `${user.background}` }}>
                            {user.shortName}
                        </span>
                    )}
                    <p>{user.name}</p>
                    <div className={styled.overlay}>
                        <Link to="/dashboard/test2/video">
                            <Button
                                className={styled.callBtn}
                                type="dashed"
                                size="large"
                                icon={
                                    <Icon name="call" width={24} height={24} />
                                }
                                ghost
                            >
                                Call
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;
