import React, { Component } from 'react';
import axios from '../../actions/axios';
import { Checkbox,Stepper, Toast, WhiteSpace,Modal} from 'antd-mobile';
import { connect } from 'react-redux';
import { getCar, changeNum, setCheckone,setQuan, delcheck } from '../../actions';
import "./index.less"
import { Head } from '../../components/Head';
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
@connect(
  state=>{
      return{
          data:state.data
      }
  }
)
class Car extends Component {
    componentDidMount(){
        if(localStorage.userstate){
            axios.get("/mycar",{
                params:{
                    usertel:localStorage.usertel
                }
            }).then(({data})=>{
                let {dispatch}=this.props;
                dispatch(getCar(data))
            })
        }else{
          alert('提示', '您尚未登录,是否先去登录', [
            { text: '取消', onPress: () => (this.props.history.push("/app/home")) },
            { text: '确认', onPress: () =>{ this.props.history.push("/login")} },
            ])
        }
    }
    setQuan1=(e)=>{
      let {dispatch}=this.props
      dispatch(setQuan(e.target.checked))
    }
    toOrder=()=>{
      var checkids=[]
      this.props.data.car.result.map((item,index)=>{
        if(item.check){
          checkids.push(item._id)
        }
      })
      if(checkids.length>=1){
        console.log(checkids)
        axios.get("/setcheck",{
          params:{
            _id:checkids
          }
        }).then(res=>{
           this.props.history.push("/order")
        })
      }else{
        Toast.info("请先选择商品")
      }
    }
    delcheck=()=>{
      var checkids=[]
      this.props.data.car.result.map((item,index)=>{
        if(item.check){
          checkids.push(item._id)
        }
      })
      if(checkids.length>=1){
        axios.get("/setcheck",{
          params:{
            _id:checkids
          }
        }).then(res=>{
           let {dispatch}=this.props;
           dispatch(delcheck())
        })
      }else{
        Toast.info("请先选择商品")
      }
    }
    render() {
      let goodslist=this.props.data.car.result
      let {dispatch} =this.props
        return(<div style={{marginTop:".9rem"}}>
          <Head title="购物车" show={true} {...this.props}></Head>
          {goodslist &&
            <div className="goodslist">
            <CheckboxItem onChange={() => this.onChange("ciri")}>
                <span className="span1">次日达</span>
                <span className="span2">实付满69包邮，还差1元，去凑单<span style={{marginLeft:"5px",color:"#888"}}>></span></span>
            </CheckboxItem>
            {goodslist.map((item,i)=> (
              <CheckboxItem key={i} checked={item.check} onChange={(e)=>{
                  dispatch(setCheckone(e.target.checked,item._id))
              }}>
                <img alt="" src={item.image}/>
                <div className="contents">
                <span className="title">{item.name}</span>
                <span className="price">{"￥"+(item.price/100).toFixed(2)}</span>
                </div> 
                <Stepper
                  style={{ width: '1rem', minWidth: '80px',float:"right",touchAction:"none"}}
                  showNumber
                  min={1}
                  value={item.count}
                  onChange={(val) =>{
                    dispatch(changeNum(val,item._id))
                  }}
                />
              </CheckboxItem>
            ))}
                        {
            goodslist.length===0 && <div><WhiteSpace/>
            <div className="searchfail">您的购物车空空如也~
            
            <u style={{color:"pink",marginLeft:"5px"}} onClick={()=>{
                        this.props.history.push("/app/classify")
                    }}>去购物</u>
            </div>
            </div>
          }
            <div className="tobuyDiv" onClick={(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
            }}>
            <CheckboxItem checked={this.props.data.quan} onChange={this.setQuan1}>
                <div className="contentdiv">
                <div className="leftdiv">
                  <span className="span1">全选</span>
                  <span className="deleteall" onClick={this.delcheck}>删除选中</span>
                  <div className="leftdiv1">
                    <span>合计:<span className="pricespan">￥{(this.props.data.total/100).toFixed(2)}</span></span>
                    <span className="sendspan">配送费:免邮</span>
                  </div>
                </div>
                <div>
                  <span className="buttonspan" onClick={this.toOrder}>去结算<i className="iconfont icon-right"></i></span>
                </div>
                </div>
            </CheckboxItem>

            </div>
            </div>
          }

        </div>
      )
    }
}
export { Car }


