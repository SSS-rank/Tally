
import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const AccountAdd =() =>{
    
const defaultTheme = createTheme();
    const navigate = useNavigate();
    const [bankType, setbankType] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setbankType(event.target.value as string);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        name: data.get('name'),
        accountNum: data.get('accountNum'),
        bankType: bankType
        });
    };
    const goBack = ()=>{
        navigate(-1);
    }

  return (
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
                    계좌 추가
                </Typography>
               
            </Grid>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Typography>은행 선택</Typography>
                <Select
                    value={bankType}
                    onChange={handleChange}
                >
                    <MenuItem value={"신한은행"}>신한은행</MenuItem>
                    <MenuItem value={"국민은행"}>국민은행</MenuItem>
                    <MenuItem value={"카카오뱅크"}>카카오뱅크</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="예금주"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="accountNum"
                  label="계좌번호"
                  name="accountNum"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              생성하기
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
    
}
export default AccountAdd;