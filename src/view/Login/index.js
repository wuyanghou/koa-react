import React from 'react';
import { Form, Input,Button,message} from 'antd';
import styles from './index.less';
import {httpPost} from 'SERVICE/index';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    const {history}=this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        let res=await httpPost('/login',values,'json');
        if(res.checked){
          history.push('/home');
        }else{
          message.warning(res.message,2);
        }
      }
    });
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  register=()=>{
    let {history}=this.props;
    history.push('/register')
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className={styles.login}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="账号  ">
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: '必填项!',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码  ">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '必填项!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem style={{textAlign:'center'}}>
            <Button type="primary" htmlType="submit" className={styles.loginBtn}>登录</Button>
            <Button onClick={this.register}>注册</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
