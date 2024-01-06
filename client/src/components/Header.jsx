import { Container, Typography } from '@mui/material';

function Header(props){
    return (
    <Container align='center' sx ={{ py: 2, borderBottom: 1, width: 1, mb: 4}} maxWidth={false}>
        <Container>
            <Typography variant='h5'> ORT Preparation</Typography>
        </Container>
    </Container>
    )
}
export default Header;