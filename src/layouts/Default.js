import React, {memo, useState} from "react";
import {useSelector} from "react-redux";
import {Layout} from 'antd';
import Footer from "../components/Footer";

const {Content} = Layout;

export default memo(({children}) => 
{
	const {width} = useSelector(({common}) => common);
	const [collapsed, setCollapsed] = useState(false);

	const handleCollapse = () => setCollapsed((current) => !current);

	return (
		<Layout className="fs-app-layout">
        <Layout>
            <Content className="fs-container-wrap fs-layout-content">
                        <div className="fs-main-content-wrapper">
                        {children}
                        </div>
                        <Footer/>
            </Content>
        </Layout>
    </Layout>
	)
});