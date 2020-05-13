

export const setname=prename=>(
    {
        type:"setname",
        prename
    }
)


export const getTabs = tabs =>{
    return {
        type:"getTabs",
        tabs
    }
}

export const getCheckgoods = () =>{
    return {
        type:"getCheckgoods"
    }
}

export const getGoods = goods =>{
    return {
        type:"getGoods",
        goods
    }
}

export const getDetail= detail =>{
    return {
        type:"getDetail",
        detail
    }
}

export const getCar= car =>{
    return {
        type:"getCar",
        car
    }
}

export const changeNum=(goodsnum,_id)=>{
    return {
        type:"changeNum",
        goodsnum,
        _id
    }
}

export const setaddress=(obj)=>{
    return {
        type:"setaddress",
        obj
    }
}

export const setCheckone=(checked,_id)=>{
    return {
        type:"setCheckone",
        checked,
        _id
    }
}

export const setQuan= quan=>{
    return {
        type:"setQuan",
        quan
    }
}


export const getaddress= (data)=>{
    return {
        type:"getaddress",
        data
    }
}


export const saveorder= ()=>{
    return {
        type:"saveorder"
    }
}

export const getorder= (data)=>{
    return {
        type:"getorder",
        data
    }
}


export const delcheck= ()=>{
    return {
        type:"delcheck"
    }
}
