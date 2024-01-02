import { useNavigate } from "react-router-dom";

function Item(props){
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(props.link);
    navigate(props.link);
  }
  return (
    <div>
      <a href={props.link}>{props.name}</a>
    </div>
  )

};

function Main(props){
  const items = []
  for (let i = 0; i < props.names.length; i++) {
      items.push(<Item name={props.names[i]} link={props.links[i]} key={i} />);
  }
  return <div>{items}</div>
};
export default Main;