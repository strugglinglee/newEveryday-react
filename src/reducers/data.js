import axios from "../actions/axios";

const defaultState={
    tabs:[],
    goods:[],
    detail:{},
    car:[],
    total:0,
    carNum:0,
    quan:false,
    count:0,
    checkgoods:[],
    address:{},
    useradd:"",
    order:[]
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case "getTabs":
        return {...state,...{tabs:action.tabs}}
        case "getGoods":
        return {...state,...{goods:action.goods}}
        case "getDetail":
        return {...state,...{detail:action.detail}}
        case "getaddress":
        return {...state,...{useradd:action.data}}
        case "getCheckgoods":
        var checkgoods=[]
        if(state.car.result){
            state.car.result.map((item,i)=>{
                if(item.check){
                    checkgoods.push(item)
                }
            })
        }
        return {...state,checkgoods}
        case "getorder":
        return {...state,order:action.data}
        case "getCar":
        var carNum=0,total=0,count=0;
        if(action.car.result){
            action.car.result.map((item,i)=>{
                count+=item.count
                if(item.check){
                    carNum+=item.count;
                    total+=item.count*item.price;
                }
                return item;
            })
        }
        return {...state,...{car:action.car,carNum,total,count}}
        case "changeNum":
        let newcar=state.car;
        newcar.result=state.car.result.map((item,i)=>{
            if(item._id===action._id){
                item.count=action.goodsnum;
                axios.get("/updategoodsnum",{
                    params:{
                        _id:action._id,
                        count:action.goodsnum
                    }
                }).then((res)=>{
                })
            }
            return item
        });
        var carNum=0,total=0,count=0;
        newcar.result.map((item,i)=>{
            count+=item.count
            if(item.check){
                carNum+=item.count;
                total+=item.count*item.price;
            }
            return item
        });
        return {...state,car:newcar,carNum,total,count}
        case "setCheckone":
        let carlist=state.car;
        var carNum=0,total=0,quan=true;
        carlist.result=state.car.result.map((item,i)=>{
            if(item._id===action._id){
                item.check=action.checked
            }
            if(item.check){
                carNum+=item.count;
                total+=item.count*item.price;
            }else{
                quan=false
            }
            return item
        });
        return {...state,car:carlist,carNum,total,quan}
        case "setQuan":
        let quanlist=state.car;
        var carNum=0,total=0;
        quanlist.result=state.car.result.map((item,i)=>{
            item.check=action.quan;
            if(item.check){
                carNum+=item.count;
                total+=item.count*item.price;
            }
            return item
        });
        return {...state,...{quan:action.quan,car:quanlist,carNum,total}}
        case "setaddress":
        axios.get("/setaddress",{
            params:action.obj
        }).then(res=>{
        })
        return {...state,address:action.obj}
        case "saveorder":
        axios.get("/saveorder",{
            params:{
                address:state.useradd,
                usertel:localStorage.usertel,
                checkgoods:state.checkgoods,
                carNum:state.carNum,
                total:state.total,
                date:new Date()
            }
        }).then(res=>{
            console.log(res.data)
        })
        return state;
        case "delcheck":
        var car={};
        var newlist=[];
        var deletelist=[];
        var carNum=0,total=0,count=0;
        state.car.result.map((item,index)=>{
            if(!item.check){
                newlist.push(item)
                count+=item.count;  
            }else{
                deletelist.push(item._id)
            }
        })
        axios.get("/removecar",{
            params:{
                id:deletelist
            }
        }).then(res=>{

        })
        car.result=newlist
        return {...state,car,carNum,total,count}
        default:
        return state
    }
}
