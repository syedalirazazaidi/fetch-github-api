import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axiox from 'axios'
import { Layout, Menu, Icon } from 'antd';
import { Switch, Link, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Repo from './components/Repo'
import SearchBox from './components/SearchBox';
const { Header, Content, Footer, Sider } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_data: null,
      repo_data: [],
      events_data: [],
      followers_data: [],
      following_data: [],
    };
  }
  fetchData = (username) => {
    axiox.get('https://api.github.com/users/' + username)
      .then
      ((user_resp) => {
        this.setState({
          user_data: {
            name: user_resp.data.name,
            bio: user_resp.data.bio,
            avatar_url: user_resp.data.avatar_url,
            followers: user_resp.data.followers,
            following: user_resp.data.following,
          }
        })
      })
      .catch((err) => {
        console.log('error', err)
      });
    axiox.get('https://api.github.com/users/' + username + '/repos')
      .then((repo_resp) => {
        this.setState({
          repo_data: repo_resp.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            login: repo.login,
            description: repo.description,
            html_url: repo.html_url
          }))
        })
      })
      .catch((err) => {
        console.log('error', err)
      });
    axiox.get('https://api.github.com/users/' + username + '/events')
      .then((event_resp) => {
        this.setState({
          events_data: event_resp.data.map(event => ({
            type: event.type,
            repo: event.repo
          }))
        })
      })
      .catch((err) => {
        console.log('error', err)
      });
    axiox.get('https://api.github.com/users/' + username + '/followers')
      .then((followers_resp) => {
        this.setState({
          event_data: followers_resp.data.map(follower => ({
            login: follower.login,
            html_url: follower.html_url,
            avatar_url: follower.avatar_url
          }))
        })
      })
      .catch((err) => {
        console.log('error', err)
      });

    axiox.get('https://api.github.com/users/' + username + '/following')
      .then((following_resp) => {
        this.setState({
          following_data: following_resp.data.map(following => ({
            login: following.login,
            html_url: following.html_url,
            avatar_url: following.avatar_url
          }))
        })
      })
      .catch((err) => {
        console.log('error', err)
      });
  }
  componentDidMount() {
    this.fetchData('syedalirazazaidi')
  }
  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{ marginTop: '60px' }}>
            <Menu.Item key="1">
              <Link to='/'>
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/repo'>
                <Icon type="github" />
                <span className="nav-text">All Repositories</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} >
          <SearchBox fetchData={this.fetchData.bind(this)}/>

          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              <Switch>
                <Route
                  exact
                  path='/'
                  // component={Profile}
                  render={() =>
                    <Profile
                      user_data={this.state.user_data}
                      repo_data={this.state.repo_data}
                      followers_data={this.state.followers_data}
                      following_data={this.state.following_data}
                      events_data={this.state.events_data}
                      avatar_url={this.state.avatar_url}
                    />
                  }
                />
                <Route
                  exact
                  path='/repo'
                  // component = {Profile}
                  render={() =>
                    <Repo
                      repo_data={this.state.repo_data}
                    />
                  }
                />
              </Switch>
              {/* <Profile
                user_data={this.state.user_data}
                repo_data={this.state.repo_data}
                followers_data={this.state.followers_data}
                following_data={this.state.following_data}
                events_data={this.state.events_data}
                avatar_url={this.state.avatar_url}
              /> */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Syed</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default App;