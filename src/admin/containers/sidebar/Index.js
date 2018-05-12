import React from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import Logo from "../../components/logo/Index";

const Index = ({ collapsed, routes }) => (
  <Layout.Sider
    width={256}
    style={{ minHeight: "100vh", background: "#02152a" }}
    trigger={null}
    collapsible
    collapsed={collapsed}
    breakpoint="xs"
    collapsedWidth="0"
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
  >
    <Logo />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      inlineCollapsed={collapsed}
      style={{ marginTop: 24 }}
    >
      {routes.map(item => (
        <Menu.Item key={`menu-${item.type}`}>
          <Link to={item.path}>
            <Icon type={item.type} />
            <span className="nav-text">{item.name}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  </Layout.Sider>
);

export default Index;
