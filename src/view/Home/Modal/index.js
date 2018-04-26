/**
 * Created by luoming on 2018/4/26
 */
import React from 'react';
import {httpGet, httpPost} from 'SERVICE/index';

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 14},
};
import {Modal, Form, message, Button, Input} from 'antd';

const FormItem = Form.Item;
export default class SelfModal extends React.Component {
  state = {};

  componentDidMount() {
    let {id} = this.props;
    id && this.loadDataById(id);
  }

  loadDataById = async (id) => {
    let {name, age, phone} = await httpGet('/getInfomationById', {id});
    this.setState({name, age, phone})
  }


  handleOk = async () => {
    let {onSuccess,id} = this.props;
    let {name, age, phone} = this.state;
    if (!name) {
      message.warning('请填写姓名', 1);
      return;
    }
    if (!age) {
      message.warning('请填写年龄', 1);
      return;
    }
    if (!phone) {
      message.warning('请填写电话', 1);
      return;
    }
    await httpPost('/saveInfo', {id,name, age, phone}, 'json');
    message.success('保存成功', 1);
    onSuccess();
  }

  render() {
    let {onClose} = this.props;
    let {name, age, phone} = this.state;
    return (
      <Modal title="新增"
             visible={true}
             onOk={this.handleOk}
             maskClosable={false}
             onCancel={onClose}>

        <Form layout='horizontal'>
          <FormItem label="姓名"{...formItemLayout}>
            <Input placeholder="请填写姓名" value={name} onChange={e => this.setState({name: e.target.value})}/>
          </FormItem>
          <FormItem label="年龄"{...formItemLayout}>
            <Input placeholder="请填写年龄" value={age} onChange={e => this.setState({age: e.target.value})}/>
          </FormItem>
          <FormItem label="电话"{...formItemLayout}>
            <Input placeholder="请填写电话" value={phone} onChange={e => this.setState({phone: e.target.value})}/>
          </FormItem>
        </Form>

      </Modal>
    )
  }
}
