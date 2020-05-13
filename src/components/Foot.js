import React, { Component } from 'react';
/* eslint global-require: 0 */
import {Badge} from "antd-mobile"
import {Link} from "react-router-dom"

/* eslint global-require: 0 */
import "../assets/css/foot.less";
import { connect } from 'react-redux';
import { getCount, getCar } from '../actions';
import axios from '../actions/axios';


@connect(
  state=>{
    return{
      data:state.data
    }
  }
)
class Foot extends Component {
  constructor(props) {
    super(props);
    this.state={
      Footlist:[
        {title:"首页",path:"/app/home",src0:"https://j-image.missfresh.cn/mis_img_20181217015118643.png?mryxw=66&mryxh=66",src1:"https://static-as.missfresh.cn/frontend/mfs3/web/static/img/home-active.5f430fd.png",src:"",color:"#888"},
        {title:"分类",path:"/app/classify",src0:"https://j-image.missfresh.cn/mis_img_20181217015204181.png?mryxw=66&mryxh=66",src1:"https://j-image.missfresh.cn/mis_img_20181217015206413.png?mryxw=66&mryxh=66",src:"",color:"#888"},
        {title:"购物车",path:"/app/car",src0:"https://j-image.missfresh.cn/mis_img_20181217015146526.png?mryxw=66&mryxh=66",src1:"https://j-image.missfresh.cn/mis_img_20181217015149442.png?mryxw=66&mryxh=66",src:"",color:"#888"},
        {title:"我的",path:"/app/my",src0:"https://j-image.missfresh.cn/mis_img_20181217015155234.png?mryxw=66&mryxh=66",src1:"https://j-image.missfresh.cn/mis_img_20181217015158048.png?mryxw=66&mryxh=66",src:"",color:"#888"}
      ]
    }
  }
  componentDidMount(){
    let {dispatch}=this.props;
    if(localStorage.userstate){
      axios.get("/mycar",{
          params:{
              usertel:localStorage.usertel
          }
      }).then(({data})=>{
          let {dispatch}=this.props;
          dispatch(getCar(data))
      })
    }
  }
  render() {
    var domlist=this.state.Footlist.map(({title,path,src0,src1,color},i)=>(
      <Link to={path} key={i} >
            {i==2 && <Badge text={this.props.data.count?this.props.data.count:"0"} hot className="hot"/> }
            <img src={this.props.match.url==path?src1:src0} alt=""/>
          <span style={{color:this.props.match.url==path?"rgb(255, 72, 145)":color}}>{title}</span>
      </Link>
    ));
    return (
        <div id="foot">
          {domlist}
        </div>
    );
  }
}
export {Foot}