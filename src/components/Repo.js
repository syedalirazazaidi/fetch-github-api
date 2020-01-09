import React, { Component } from 'react';
import { Table } from 'antd';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href={record.url}>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>Invite {record.name}</a>
            </span>
        ),
    },
];
class Repo extends Component {
    render(props) {
        const repo_data = this.props.repo_data
        return (

            <div>
                <Table columns={columns} dataSource={repo_data.map(repo_data =>
               ( {
                    key: repo_data.id,
                    name: repo_data.name,
                    owner: repo_data.owner,
                    description: repo_data.description,
                    url: repo_data.html_url,
                })
                )} />
            </div>
        );
    }
}

export default Repo;