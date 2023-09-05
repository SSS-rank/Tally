import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useParams} from 'react-router-dom'
  
  
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const AccountDetail = () =>{
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate(-1);
    }
    let {accountNumber} = useParams();
    useEffect(() => {
        console.log(accountNumber)
        const fetchAccountData = async () => {
            try{
            //   const {data} = await axios.get(`/api/lesson/card`)
            //   console.log(data)
            } catch (error) {
              console.error(error);
            }
          }
          fetchAccountData()
    });
    return(
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid  container spacing={2}>
            <Grid item xs={4}>
                <ArrowBackIosNewIcon onClick= {goBack}/>
            </Grid>
            <Grid>
                <Typography component="h1" variant="h5">
                    계좌 상세
                </Typography>
                <Typography component="h1" variant="h5">
                    {accountNumber}
                </Typography>
            </Grid>
          </Grid>
          <Container sx={{ py: 2 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    
                    <CardContent sx={{ flexGrow: 1 }} >
                      <Typography gutterBottom variant="h5" component="h2" id="accountNum" >
                        결제 항목
                      </Typography>
                      <Typography>
                        금액
                      </Typography>
                    </CardContent>
                    
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
            
        </Box>
      </Container>
      </ThemeProvider>
    );
};
export default AccountDetail;