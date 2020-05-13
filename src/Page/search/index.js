import React,{Component} from "react";
import { WingBlank, WhiteSpace ,InputItem} from "antd-mobile";
import "./index.less"
import { connect } from "react-redux";
import { getGoods } from "../../actions";
import axios from "../../actions/axios";
import { Searchlist } from "../../components/Goodlist/search";
import { Head } from "../../components/Head";

@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class Search extends Component {
    state={
        word:"",
        spanlist:["火锅","土豆","火龙果","麻辣"]
    }
    searchword=()=>{
    }
    render(){
        var {data:{goods}}=this.props;
        var spanlist=this.state.spanlist.map((item,index)=>(
            <span key={index} onClick={
                ()=>{
                    this.setState({word:item});
                    let {dispatch}=this.props;
                    axios.get("/goodsinfo").then(({data:{result}})=>{
                        dispatch(getGoods(result))
                    })
                }
            }>{item}</span>
        ))
        return(
            <div style={{marginTop:".9rem"}}>
             <Head show={true} title={"搜索"} {...this.props}></Head>
            <WingBlank>
            <WhiteSpace></WhiteSpace>
            <div className="searchDiv">
            <InputItem placeholder="请输入您想查询的商品名"  value={this.state.word}
            onChange={(word)=>{
                this.setState({word});
                let {dispatch}=this.props;
                axios.get("/goodsinfo").then(({data:{result}})=>{
                    dispatch(getGoods(result))
                })
            }}
            />
                <i className="iconfont icon-search"></i>
                <span className="btnspan">搜索</span>
            </div>
            <WhiteSpace></WhiteSpace>
            <div className="searchlink">
                {spanlist}
            </div>
            <div className="searchresult">
                {
                    this.state.word &&  <Searchlist {...this.props} word={this.state.word} goods={goods}/>
                }
                {
                    !this.state.word &&  <div>
                        <WhiteSpace></WhiteSpace>
                        <div className="searchtips">请输入关键字进行查找</div>
                        </div>
                }
                
            </div>
            </WingBlank>
            
        </div>)
    }
}
export {Search}