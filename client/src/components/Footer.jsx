import { Container, Typography } from '@mui/material';

function Footer(props){
    return (
    <Container align='center' sx ={{ py: 2, borderTop: 1, width: 1, bottom:0, mt:5}} maxWidth={false}>
        <Container>
            <Typography variant='a'> Contact here: </Typography>
        </Container>
    </Container>
    )
}
export default Footer;