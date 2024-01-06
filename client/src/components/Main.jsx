import { Button, Container, Grid } from "@mui/material";


function Item(props){
  return (
    <Button variant="outlined" color="primary"  sx={{width:1, py:2}}href={props.link}>{props.name}</Button>
  )

};
function Items(props){
  const items = []
  for (let i = 0; i < props.names.length; i++) {
      items.push(
        <Grid item xs={Math.floor(12/props.numOfColumns)} key={i}>
          <Item name={props.names[i]} link={props.links[i]}/>
        </Grid>
      );
  }
  return (
    <Grid container spacing={2}>
      {items}
    </Grid>
  );

}

function Main(props){
  return(
    <Container>
      <Items names={props.names} links={props.links} numOfColumns={1}/>
    </Container>
  )
};
export default Main;