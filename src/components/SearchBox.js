import React, { Component } from 'react';

import { Input } from 'antd';
const { Search } = Input;
class SearchBox extends Component {

    state = {};

    render() {
        return (
            <div>
                <Search
                    style={{
                        width: ' 300px',
                        marginLeft: '20px'
                    }}
                    placeholder="Github User Name" onSearch={value => this.props.fetchData(value)}
                    enterButton />
            </div>

        );
    }
}

export default SearchBox;