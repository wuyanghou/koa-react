import React from 'react';
import {Router, Route, NavLink} from 'mirrorx'
import {Menu, Icon, Button, message, Modal,Form,Input,Spin} from 'antd';
import asyncComponent from '../../asyncComponent'
import {httpGet} from 'SERVICE/index';
import styles from './index.less';
import {httpPost} from 'SERVICE/index';

const MenuItem = Menu.Item;
const FormItem = Form.Item;
const DefaultProps = asyncComponent(() => import('../../view/DefaultProps'));
const Mobx = asyncComponent(() => import('../../view/Mobx'));
const Context = asyncComponent(() => import('../../view/Context'));
const Oss = asyncComponent(() => import('../../view/Oss'));
const ChildRouter = asyncComponent(() => import('../../view/ChildRouter'));
const Home = asyncComponent(() => import('../../view/Home'));

class Wrap extends React.Component {
  state = {
    loading:false
  };

  componentWillMount() {
    let {history} = this.props;
    history.push('/home');
  }

  /**
   * 登出
   * @returns {Promise.<void>}
   */
  logout = async () => {
    let {history} = this.props;
    await httpGet('/logout');
    message.success('退出成功', 1);
    history.push('/login');
  }

  /**
   * 修改密码
   */
  handleOk=(e)=>{
    const {history}=this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        this.setState({loading:true});
        let {code,resultMessage}=await httpPost('/alterPassword',values,'json');
        this.setState({loading:false});
        if(code===0){
          message.success('修改成功！',1);
          history.push('/login');
        }else{
          message.error(resultMessage,2);
        }
      }
    });
  }

  render() {
    const {visible,loading} = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <div className={styles.header}>
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[location.pathname]}
        >
          <MenuItem key="/home">
            <NavLink to="/home"><Icon type="home"/>Home</NavLink>
          </MenuItem>
          <MenuItem key="/defaultProps">
            <NavLink to="/defaultProps"><Icon type="bars"/>DefaultProps</NavLink>
          </MenuItem>
          <MenuItem key="/mobx">
            <NavLink to="/mobx"><Icon type="frown-circle"/>mobx</NavLink>
          </MenuItem>
          <MenuItem key="/context">
            <NavLink to="/context"><Icon type="frown-circle"/>context</NavLink>
          </MenuItem>
          <MenuItem key="/oss">
            <NavLink to="/oss"><Icon type="frown-circle"/>oss</NavLink>
          </MenuItem>
          <MenuItem key="/childrouter">
            <NavLink to="/childrouter"><Icon type="frown-circle"/>childrouter</NavLink>
          </MenuItem>
          <MenuItem key="/mirror">
            <a target="_blank" href="https://github.com/mirrorjs/mirror">Mirror</a>
          </MenuItem>
        </Menu>
        <Button onClick={this.logout} className={styles.logout}>安全退出</Button>
        <Button onClick={e => this.setState({visible: true})} className={styles.password}>修改密码</Button>
        <div>
          <Route path="/home" component={Home}/>
          <Route path="/defaultProps" component={DefaultProps}/>
          <Route path="/mobx" component={Mobx}/>
          <Route path="/context" component={Context}/>
          <Route path="/oss" component={Oss}/>
          <Route path="/childrouter" component={ChildRouter}/>
        </div>
        <Modal
          title="修改密码"
          visible={visible}
          onOk={this.handleOk}
          onCancel={e=>this.setState({visible:false})}>
          <Spin spinning={loading}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="原密码  ">
                {getFieldDecorator('oldPassword', {
                  rules: [{
                    required: true, message: '必填项!',
                  }],
                })(<Input type="password" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="新密码  ">
                {getFieldDecorator('newPassword', {
                  rules: [{
                    required: true, message: '必填项!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(<Input type="password" />)}
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Wrap)
