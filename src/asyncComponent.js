/**
 * 异步加载组件实现
 */
import React from 'react';

let asyncComponent = (importComponent) => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      let {default: component} = await importComponent();
      this.setState({component});
    }

    render() {
      let C = this.state.component;
      return (
        C ? <C {...this.props} /> : null
      )
    }
  }

  return AsyncComponent;
}
export default asyncComponent;
