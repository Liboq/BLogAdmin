import Style from './index.module.less'
const Card = (props) => {
  return (
    <>
      <div key={props.title} className={Style["card"]}>
        <div className={Style["card-title"]}>{props.data.title}</div>
        <div className={Style["card-content"]}>{props.data.content}</div>
      </div>
    </>
  );
};
const Cards = (props) => {
  const numbers = props.numbers
  const arts = props.arts
  const message = props.message
  const gollery = props.gollery
  const data = [{
    title:'网站用户数量',
    content: numbers
  },{
    title:'文章数量',
    content: arts.length
  },
  {
    title:'留言数量',
    content: message
  },
  {
    title:'图库数量',
    content: gollery
  },
  {
    title:'友链数',
    content:1
  }
]
  let list =  []
  list = data.map((item,index) => {
  return (<div key={index}><Card  data={item} /></div>)  
  })
  return (<>
      <div className={Style["cards"]} >{list}</div>
  </>)
}
export default Cards;
