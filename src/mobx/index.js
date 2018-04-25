import {observable,autorun,computed ,action} from 'mobx';
class AppState {
  @observable name='luoming';
  @observable age=26;
  @observable length=10;
  @computed get total() {
    return this.age * this.length;
  }
  @action.bound
  increment() {
    this.age++ // 'this' 永远都是正确的
  }
}
let appState=new AppState();
autorun(()=>{
  console.log(appState.age);
})
export default appState;
