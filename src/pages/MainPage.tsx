import React, {useEffect,  useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

  
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const MainPage = () =>{
    const navigate = useNavigate();
    const accountNumRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const fetchAccountData = async () => {
            try{
              // const {data} = await axios.get(`/api/lesson/card`)
              // console.log(data)
            } catch (error) {
              console.error(error);
            }
          }
          fetchAccountData()
    });
    const handleAccountClick = () =>{
      const accountNumElement = accountNumRef.current;
      if (accountNumElement) {
        const accountNumValue = accountNumElement.innerText;

        console.log('클릭된 Typography의 값:', accountNumValue);
        navigate('/accountdetail/'+ accountNumValue)
      }
    }
    
    return(
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                SSS-Bank
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                SSS-Bank
              </Typography>
              
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained"  href="/accountadd" className="btn btn-primary">
                  계좌 추가
                </Button>
                <Button variant="outlined">shop 목록</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 2 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    
                    <CardContent sx={{ flexGrow: 1 }} onClick={handleAccountClick}>
                      <Typography gutterBottom variant="h5" component="h2" id="accountNum" ref={accountNumRef}>
                        110110
                      </Typography>
                      <Typography>
                        금액
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small"  href="/transfer">이체</Button>
                      <Button size="small">삭제</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
       
      </ThemeProvider>
    );
};
export default MainPage;