import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
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
    useEffect(() => {
        const fetchAccountData = async () => {
            try{
              const {data} = await axios.get(`/api/lesson/card`)
              console.log(data)
            } catch (error) {
              console.error(error);
            }
          }
          fetchAccountData()
    });
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
                <Button variant="contained">계좌 추가</Button>
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
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the
                        content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">이체</Button>
                      <Button size="small">삭제</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </Box> */}
        {/* End footer */}
      </ThemeProvider>
    );
};
export default MainPage;