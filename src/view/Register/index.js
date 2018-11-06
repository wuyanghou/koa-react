/**
 * Created by luoming on 2018/4/27
 */
import React from 'react';
import {Form, Input, Button, message as showMessage} from 'antd';
import styles from './index.less';
import {httpPost} from 'SERVICE/index';

class RegistrationForm extends React.Component {
  state = {};
  register = async () => {
    let {history} = this.props;
    let {email, password} = this.state;
    if (!email) {
      showMessage.warning('请填写账号！', 1);
      return;
    }
    if (!password) {
      showMessage.warning('请填写密码！', 1);
      return;
    }
    let {code,message}=await httpPost('/register', {email, password}, 'json');
    if(code===0){
      showMessage.success('注册成功，即将跳转登录页面！', 1);
      setTimeout(()=>{
        history.push('/login');
      },1500)
    }else{
      showMessage.error(message,1)
    }
  }

  render() {
    let {email, password} = this.state;
    return (
      <div className={styles.wrap}>
        <div className={styles.register}>
          <div><span>账号</span><Input value={email} onChange={e => this.setState({email: e.target.value})}/></div>
          <div><span>密码</span><Input value={password} onChange={e => this.setState({password: e.target.value})}/>
          </div>
          <Button type="primary" className={styles.registerBtn} onClick={this.register}>注册</Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
