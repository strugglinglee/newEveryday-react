import React , {Component} from "react";
import { Tabs} from 'antd-mobile';
import { connect } from 'react-redux';
import axios from "../../actions/axios";
import judgetype from "../../assets/scripts"
import { getTabs, getGoods } from "../../actions";
import "./Homenav.less"
import { GoodList } from "../Goodlist/Goodlist";


@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class Slidenav extends Component{
    componentDidMount(){
        let {dispatch}=this.props
        axios.get("/goodstype",{
            params:{key:"secondGroupId"}
        }).then((res)=>{
            var data =[]
           res.data.result.map((item)=>{
               var type=item;
               item=judgetype(item)
               data.push({title:item,type})
               return item
           })
           dispatch(getTabs(data))
        })
        axios.get("/goodsinfo").then(({data:{result}})=>{
            dispatch(getGoods(result))
        })
    }
    render(){
        var {data:{tabs,goods}}=this.props;
        var goodsinfo=tabs.map((tab,i)=>(
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%',boxSizing:"border-box",paddingBottom:".8rem", backgroundColor: '#fff' ,overflowY:"scroll"}}>
            <GoodList {...this.props} {...tab} goods={goods}/>
            </div>
        ))
        return(
            <div style={{ height:"91.5%",width:"100%"}}>
            <Tabs tabs={tabs}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={10} />}
              tabBarPosition="left"
              tabDirection="vertical"
              tabBarBackgroundColor="#f4f4f4"
            >
                    {goodsinfo}
            </Tabs>
          </div>
        )
    }
}



export {Slidenav}

