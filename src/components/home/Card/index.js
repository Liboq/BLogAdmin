import Style from './index.module.less'
const Card = (props) => {
  return (
    <>
      <div className={Style["card"]}>
        <div className={Style["card-title"]}>{props.data.title}</div>
        <div className={Style["card-content"]}>{props.data.content}</div>
      </div>
    </>
  );
};
const Cards = (props) => {
  const numbers = props.numbers
  const arts = props.arts
  console.log(props);
  const data = [{
    title:'网站用户数量',
    content: numbers
  },{
    title:'文章数量',
    content: arts.length
  }]
  let list =  []
  data.map((item,index) => {
  return list.push(<><Card key={index} data={item} /></>)  
  })
  return (<>
      <div className={Style["cards"]} >{list}</div>
  </>)
}
export default Cards;
