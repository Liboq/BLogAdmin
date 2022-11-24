import { useEffect, useState } from "react"
import Tab from "../../../components/message/list"
import { getAllMes,delMessage } from "../../../request/message"
const Message = ()=>{
    const [dataList,setDataList] =useState([])
    useEffect(()=>{
        getAllMess()
    },[])
    const delMessages = async () =>{
        await delMessage()
        getAllMess()
    }
    const getAllMess = async()=>{
       const res =  await getAllMes()
       setDataList(res.data)
       console.log(res);
    }
    return <><Tab delMessage={delMessages} dataList={dataList}></Tab></>
}
export default Message