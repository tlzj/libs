import React, { Component } from 'react'
import './indexNew.less'
import _ from 'lodash'
const ListComponent = Loader.loadComponent('ListComponent');

class LibSelect extends Component {
  state = {
    listData: [] // 全部布控库列表
  }
  componentDidMount(){
    let { libType } = this.props
    Service.monitor.queryLibList({ libType }).then(result => {
      const items = result.resultList
      this.setState({
        listData: items
      })
    })
  }
  selectLibs = ({ item, flag, changeAll, list }) => {
    console.log(item, flag, changeAll, list, '----')
    if (flag) {
      !changeAll
        ? this.selectList.push(item)
        : (this.selectList = [].concat(this.selectList, list));
    } else {
      if (changeAll) {
        this.selectList = _.differenceBy(this.selectList, list, 'id');
      } else {
        _.remove(this.selectList, v => v.id === item.id);
      }
    }
    let ids = []
    this.selectList.forEach(item => ids.push(item.id))
    this.props.onSelected && this.props.onSelected(ids);
  }
  getSelectList = (libId) => {
    let { listData } = this.state
    this.selectList = listData.filter(item => ~libId.indexOf(item.id)) || []
    return this.selectList
  }
  render(){
    const { listData } = this.state
    let selectList = this.getSelectList(this.props.libId)
    return (
      <div className='libs-select-tl'>
        <ListComponent 
          hasTitle={true}
          checkable={true}
          hasSearch={true}
          listData={listData}
          selectList={selectList}
          onChange={this.selectLibs}
          className='libs-list-all'
        />
        <ListComponent 
          hasTitle={true}
          hasClear={true}
          listData={selectList}
          onChange={this.selectLibs}
          className='libs-list-select'
        />
      </div>
    )
  }
}

export default LibSelect