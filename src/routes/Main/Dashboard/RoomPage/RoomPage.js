import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";

import { Layout } from "../../../../components/Layout";
import { Users } from "../../../../components/Users";
import Icon from "../../../../components/Icon";

const items = [
    {
        key: "1",
        label: (
            <Link to="/">
                <Icon name="edit" width={16} height={16} /> Change Password
            </Link>
        ),
    },
    {
        key: "2",
        label: (
            <Link to="/">
                <Icon name="group" width={16} height={16} /> Edit Profile
            </Link>
        ),
    },
    {
        key: "3",
        label: (
            <Link to="/">
                <Icon name="setting" width={16} height={16} /> Logout
            </Link>
        ),
    },
];

const users = [
    {
        id: 1,
        name: "Karen A",
        shortName: "KA",
        imageUrl: "",
        background: "#fa541c",
    },
    {
        id: 2,
        name: "Jenny Weigel",
        shortName: "JW",
        imageUrl: "",
        background: "#722ed1",
    },
    {
        id: 3,
        name: "Katherine W",
        shortName: "KW",
        imageUrl: "",
        background: "#eb2f96",
    },
    {
        id: 4,
        name: "James Arkhan",
        shortName: "JA",
        imageUrl: "",
        background: "#1890ff",
    },
    {
        id: 5,
        name: "Boy W",
        shortName: "BW",
        imageUrl: "",
        background: "#13c2c2",
    },
];

const RoomPage = () => {
    return (
        <Layout
            isVideoCall={false}
            rightSection={
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                >
                    <Button
                        type="link"
                        icon={<Icon name="user" width={32} height={32} />}
                        ghost
                    />
                </Dropdown>
            }
        >
            <Users data={users} />
        </Layout>
    );
};

export default RoomPage;
