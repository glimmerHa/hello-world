/**
 * [initHeadArr description]
 * @param  {[type]} first [description]
 * @param  {[type]} other [description]
 * @return {[type]}       [description]
 */
export function initHeadArr(first, other){
    let arr = []
    // true 则有测试对象名显示
    if(first.testName){
        arr.push('')
    }

    other.forEach(item => {
        if(item.isChoose){
            arr.push(item.title)
        }
    });

    return arr
}
/**
 * [initBodyArr description]
 * @param  {[type]} origin [description]
 * @param  {[type]} first  [description]
 * @param  {[type]} other  [description]
 * @return {[type]}        [description]
 */
export function initBodyArr(origin, first, other ){
    let twoDimen = []
    if(first.testName){
        origin.forEach(item=>{
            let arr = []
            arr.push(item.testName)
            twoDimen.push(arr)
        })
        console.log('twodimen', twoDimen)
    }
    origin.forEach((item,index) => {
        let rows = item.rows
        other.forEach((i) => {
            if(i.isChoose){
                // 取数据，进行三位数存取
                let number = parseFloat(rows[i.id]).toFixed(3)
                twoDimen[index].push(number)
            }
        })
    })
    return twoDimen
}
/**
 * [transpose description]
 * @param  {[type]} origin [description]
 * @return {[type]}        [description]
 */
export function transpose(origin){
    //定义一个新的数组
    var arr2 = [];
    //对新的数组进行初始化
    //因为新的数组的行数都等于原来数组列的数量

    for (var i = 0; i < origin[0].length; i++) {
      arr2[i] = [];
    }
    //开始进行数组的转置
    for (var i = 0; i < origin.length; i++) {
      for (var j = 0; j < origin[i].length; j++) {
        arr2[j][i] = origin[i][j];
      }
    }
    //对新的数组进行遍历，取出新的矩阵
    return arr2
}

/**
 * [mergeTwoDimen description]
 * @param  {[type]} origin [description]
 * @param  {[type]} cur    [description]
 * @return {[type]}        [description]
 */
export function mergeTwoDimen(origin, cur){
    console.log('mergeTwoDimen-->origin',origin)
    // cur有问题
    console.log('mergeTwoDimen===> cur', cur)
    if(!origin){
        origin = []
    }
    // 获取 两个二维数组的第一个元素， 合并
    let headArr = mergeArr(origin[0], cur[0])
    // console.log('headArr', headArr)
    // 单独转化为对象
    let originObj = Array2Object(origin)
    let curObj = Array2Object(cur)
    // 单独扩展 对象 key
    originObj = extendObject(originObj, headArr)
    // console.log('originOBj', originObj)
    curObj = extendObject(curObj, headArr)
    // console.log('curObj', curObj)

    let originNew =Object2Array(originObj,headArr)
    // console.log('originNew-----', originNew)
    // 对象转换成数组 todo 有问题
    let curNew = Object2Array(curObj,headArr)
    // console.log('curNew++++++',curNew)
    
    // 合并数组
    return mergeTwoDimenArray (originNew, curNew)
}
/**
 * [mergeTwoDimenArray description]
 * @param  {[type]} originNew [description]
 * @param  {[type]} curNew    [description]
 * @return {[type]}           [description]
 */
function mergeTwoDimenArray (originNew, curNew){
    curNew.shift()
    originNew.push(...curNew)
    // console.log('最终的值', originNew)
    return originNew
}
/**
 * [mergeArr description]
 * @param  {[type]} origin [description]
 * @param  {[type]} cur    [description]
 * @return {[type]}        [description]
 */
function mergeArr (origin, cur){
    
    // 判断类型 省略
    if(!origin){
        origin = []
    }
    console.log('origin 头部', origin)
    console.log('cur 头部', cur)
    return [...new Set(origin.concat(cur))]

}

/**
 * [Array2Object description]
 * @param {[type]} arr [description]
 */
function Array2Object(arr){
    let result = {}
    let  i = 1
    let arrHead = arr[0]
    for( let arrLen = arr.length; i < arrLen ; i++){

        let obj = {}
        let item = arr[i]
        let j = 1

        for(let len = item.length; j < len; j++){
            obj[arrHead[j]] = item[j]
        }

        result[item[0]] = obj
    }
    return result;
}
/**
 * [extendObject description]
 * @param  {[type]} obj     [description]
 * @param  {[type]} headArr [description]
 * @return {[type]}         [description]
 */
function extendObject (obj, headArr){

    for(let item in obj){

        let curKeys =  Object.keys(obj[item])
        
        let extendKeys = headArr.filter((head)=>{
            return head !== '' && !curKeys.includes(head)
        })

        for( let  i = 0, exlen = extendKeys.length ; i < exlen; i++){

            obj[item][extendKeys[i]] = ""

        }
    }

    return obj

}
/**
 * [Object2Array description]
 * @param {[type]} obj     [description]
 * @param {[type]} headArr [description]
 */
function Object2Array(obj,headArr){

    let arr = []
    arr.push(headArr)

    // 简单深拷贝一份数组 arr
    let keys = JSON.parse(JSON.stringify(headArr))

    keys.shift()

    for(let item in obj){
        let curArr = []
        curArr.push(item)

        
        for(let i =0 ,len = keys.length; i < len; i++ ){

            curArr.push(obj[item][keys[i]])

        }
        arr.push(curArr)
        
    }
    return arr
}