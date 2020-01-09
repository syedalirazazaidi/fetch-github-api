import React, { Component } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import { List, Avatar } from 'antd';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { user_data, events_data, followers_data, following_data } = this.props
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                {
                    user_data ?
                        <div>
                            <div className="name_container">
                                <h1>{user_data.name}</h1>
                                <Avatar src={user_data.avatar_url} shape="square" size={64} icon="user" />
                            </div>
                            <p>{user_data.bio}</p>
                        </div> : <div style={{ textAlign: 'center', padding: '10px' }}>
                            <Spin />
                        </div>}
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title=" Recent Activities" >
                            <List
                                itemLayout="horizontal"
                                pageSize="5"
                                dataSource={events_data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.type}
                                            description={item.repo.name}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title=" Following">
                            <List
                                itemLayout="horizontal"
                                pageSize="5"
                                dataSource={following_data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar_url} />}
                                            title={<a href={item.html_url}>{item.login}</a>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Followers">
                            <List
                                itemLayout="horizontal"
                                pageSize="5"
                                dataSource={followers_data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.title}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Profile;