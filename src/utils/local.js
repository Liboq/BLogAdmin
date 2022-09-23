export const isNull = (data) =>{
    let flag= true
    for (const key in data) {
      if( data[key].length===0){
        return flag= false
      }
    }
    return flag
}
