import React, {memo} from "react";
import {Layout} from "antd";

const {Footer} = Layout;

export default memo(() =>
{
	return (
    <Footer>
        <div className="fs-layout-footer-content">
            &copy;{(new Date()).getFullYear()} Copyright | All Rights Reserved.
        </div>
    </Footer>
	)
})