import React, {memo} from "react";
import {
	LoadingOutlined
} from "@ant-design/icons";

export default memo(() =>
{
	return (
		<div className="fs-w-100 fs-py-5 fs-text-center">
			<LoadingOutlined className="fs-fs-icon-lg"/>
		</div>
	)
})