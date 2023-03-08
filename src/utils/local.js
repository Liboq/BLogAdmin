export const isNull = (data) =>{
    let flag= true
    for (const key in data) {
      if( data[key].length===0){
        return flag= false
      }
    }
    return flag
}
// 树形数据扁平化
export const transformTree= (treeData) =>{
  return treeData.reduce((pre,cur)=>{
    const {children=[],...i} = cur
    return pre.concat([{...i}],transformTree(children))
  },[])
}
