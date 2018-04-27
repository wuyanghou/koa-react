/**
 * Created by luoming on 2018/4/27
 */
import React from 'react';
import {Input,Button} from 'antd';
import styles from './index.less';
export default class SearchBar extends React.Component{
  state={}
  search=()=>{
    let {onSearch}=this.props;
    onSearch();
  }
  render(){
    return (
      <div className={styles.wrap}>
        <span>
          {this.props.children}
        </span>
          <Button onClick={this.search} type="primary">查询</Button>
      </div>
    )
  }
}
