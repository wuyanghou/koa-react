import React from 'react';
import {httpGet, httpPost} from 'SERVICE/index';
import {Table, message, Button, Input} from 'antd';
import Modal from './Modal/index';
import styles from './index.less';
import SearchBar from 'COMPONENT/SearchBar';

export default class Home extends React.PureComponent {
  state = {};

  async componentDidMount() {
    this.loadData();
  }

  loadData = async (search = {}) => {
    this.setState({loading: true});
    let {username, data} = await httpGet('/getInformation', search);
    data = data.map((v, k) => {
      return {key: k, ...v};
    })
    this.setState({username, data, loading: false});
  }

  search = () => {
    const {name, age, phone} = this.state;
    this.loadData({name,age,phone});
  }
  deleteInfo = async (id) => {
    this.setState({loading: true});
    await httpPost('/deleteInfo', {id}, 'json');
    message.success('删除成功', 1);
    this.loadData();
  }
  changeInfo = async (id) => {
    this.setState({id, addVisiable: true})
  }
  onSuccess = () => {
    this.setState({addVisiable: false});
    this.loadData();
  }

  render() {
    let {loading, addVisiable, username, data = [], id, name, age, phone} = this.state;
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let {id} = record;
          return (
            <div className={styles.action}>
              <span onClick={e => {
                this.deleteInfo(id)
              }}>删除</span>
              <span onClick={e => {
                this.changeInfo(id)
              }}>修改</span>
            </div>
          )
        },
      }
    ];
    return (
      <div>
        <div className={styles.header}>
          <h1>当前登录用户是{username}</h1>
          <Button type='primary' onClick={e => this.setState({addVisiable: true})}>新增</Button>
        </div>
        <div>
          <SearchBar onSearch={this.search}>
            <Input placeholder={'姓名'} value={name} onChange={e => this.setState({name: e.target.value})}/>
            <Input placeholder={'年龄'} value={age} onChange={e => this.setState({age: e.target.value})}/>
            <Input placeholder={'电话'} value={phone} onChange={e => this.setState({phone: e.target.value})}/>
          </SearchBar>
        </div>
        <Table loading={loading} columns={columns} dataSource={data}/>
        {addVisiable &&
        <Modal onClose={e => this.setState({addVisiable: false})} onSuccess={this.onSuccess} id={id}/>
        }
      </div>
    )
  }
}
