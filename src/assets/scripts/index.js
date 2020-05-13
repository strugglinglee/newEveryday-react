function judgetype(type){
    switch(type){
        case "hz-shucai":
        return "蔬菜"
        case "hz-jinriremai":
        return "热卖"
        case "hz-pingjiacai":
        return "菜品"
        case "hz-shuiguo2":
        return "水果"
        case "hz-roudan":
        return "肉蛋"
        case "hz-sushi":
        return "速食"
        case "hz-rupin":
        return "乳品"           
        case "hz-shuichan":
        return "水产"
        case "hz-liangyou":
        return "粮油"
        case "hz-lingshi":
        return "零食"
        case "hz-jiuyinribai":
        return "日百"
        default:
        return ""       
    }
}
export default judgetype; 