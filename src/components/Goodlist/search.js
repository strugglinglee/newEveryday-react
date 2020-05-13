import React, {Component } from "react";
import {WhiteSpace, Toast,Modal} from 'antd-mobile';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import "./Goodlist.less"
import axios from "../../actions/axios";
import { getCar } from "../../actions";
const alert = Modal.alert;
@connect()
class Searchlist extends Component{
    state = {
        refreshing:false
    }
    render(){
        let {word,goods} = this.props;
        let data = goods.filter((good,i)=>good.normalProducts.name.indexOf(word)!==-1);
        console.log(data)
        return (
            <div>
                    {   data.length>0 &&
                        data.map((item,index)=>{
                            var price=item.normalProducts.pricePro.noVip.price/100
                            return (
                                    <Link to={ {pathname:'/detail/'+item._id} } className="goodsdiv" key={index}>
                                        <div className="imgDiv">
                                            <img src={item.normalProducts.image} alt=""/>
                                        </div>
                                        <div className="contentDiv">
                                            <p className="namep">{item.normalProducts.name}</p>
                                            <p className="descp">{item.normalProducts.subtitle}</p>
                                            <p className="price">{"￥"+price.toFixed(2)}</p>
                                            <img src={item.normalProducts.cart_image} alt=""
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                var {_id,secondGroupId,normalProducts:{name,image,pricePro:{noVip:{price}}}}=item;
                                                if(localStorage.userstate){
                                                    axios.get("/car",{
                                                        params:{
                                                            id:_id,
                                                            name,
                                                            price,
                                                            secondGroupId,
                                                            image,
                                                            count:1,
                                                            usertel:localStorage.usertel
                                                        }
                                                    }).then(({data:result})=>{
                                                       if(result.type){
                                                        axios.get("/mycar",{
                                                            params:{
                                                                usertel:localStorage.usertel
                                                            }
                                                        }).then(({data})=>{
                                                            let {dispatch}=this.props;
                                                            dispatch(getCar(data))
                                                        })
                                                        Toast.success("宝贝已成功放入购物车")
                                                       }else{
                                                        Toast.info("哎呦，服务器正在开小差，请稍后再试")
                                                       }
                                                    })
                                                    
                                                }else{
                                                    alert('提示', '您尚未登录，是否跳转至登录页面？', [
                                                    { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                                                    { text: '确认', onPress: () =>{Toast.info("正在为您跳转至登录页面");this.props.history.push("/login")} },
                                                    ])
                                                }
                                            }}
                                            />
                                            <p className="vipprice">{"￥"+(price*.8).toFixed(2)}
                                            
                                            <span>会员8折</span>
                                            </p>
                                        </div>
                                    </Link>
                            )
                        })
                    }
                {
                   data.length===0&& <div>

                        <WhiteSpace></WhiteSpace>
                       <div className="searchfail">抱歉，未能找到您搜索的商品</div>
                       </div>
                }
            </div>

        )
    }
}
export {Searchlist}

