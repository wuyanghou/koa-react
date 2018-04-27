/**
 * Created by luoming on 2018/4/27
 */
import React from 'react';
import {Form, Input, Button, message} from 'antd';
import styles from './index.less';
import {httpPost} from 'SERVICE/index';

class RegistrationForm extends React.Component {
  state = {};
  register = async () => {
    let {history} = this.props;
    let {email, password} = this.state;
    if (!email) {
      message.warning('请填写邮箱！', 1);
      return;
    }
    if (!password) {
      message.warning('请填写密码！', 1);
      return;
    }
    let data=await httpPost('/register', {email, password}, 'json');
    if(data){
      message.success('注册成功，即将跳转登录页面！', 1);
      setTimeout(()=>{
        history.push('/login');
      },1500)
    }
  }

  render() {
    let {email, password} = this.state;
    return (
      <div className={styles.wrap}>
        <div className={styles.register}>
          <div><span>email</span><Input value={email} onChange={e => this.setState({email: e.target.value})}/></div>
          <div><span>password</span><Input value={password} onChange={e => this.setState({password: e.target.value})}/>
          </div>
          <Button type="primary" className={styles.registerBtn} onClick={this.register}>注册</Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
