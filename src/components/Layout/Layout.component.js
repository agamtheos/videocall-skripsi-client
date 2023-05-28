import React from "react";
import { Link } from "react-router-dom";
import { Layout as BaseLayout, Space, Divider } from "antd";
import clsx from "classnames";

import { HangUp } from "../Actions/HangUp";
import Icon from "../Icon";

import styled from "./Layout.module.css";

const { Header, Content } = BaseLayout;

const Layout = ({ children, link, me, they, isVideoCall, rightSection }) => {
    return (
        <BaseLayout className={styled.layout} hasSider={false}>
            <Header
                className={styled.header}
                style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
            >
                <Space className={clsx({ "ant-lg-only": isVideoCall })}>
                    <Link>
                        <img
                            src="/assets/img/company-logo.svg"
                            alt="Company Logo"
                        />
                    </Link>
                    {isVideoCall ? (
                        <div className="ant-lg-only">
                            <Divider
                                type="vertical"
                                className={styled.divider}
                            />
                            <Link>
                                <Icon
                                    name="sound"
                                    style={{ marginRight: 120 }}
                                />{" "}
                                <span>{me}, {they} (You)</span>
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                </Space>
                {isVideoCall ? (
                    <Space className="ant-xs-only">
                        <HangUp
                            icon={
                                <Icon name="sign-out" width={24} height={24} />
                            }
                            link={link}
                        />
                    </Space>
                ) : (
                    ""
                )}
                {rightSection ? (
                    <div className={styled.rightSection}>{rightSection}</div>
                ) : (
                    ""
                )}
            </Header>
            <Content className={styled.content}>{children}</Content>
        </BaseLayout>
    );
};

export default Layout;
