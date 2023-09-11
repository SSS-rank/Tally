import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
function MainPage() {
	const navigate = useNavigate();
	const accountNumRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const fetchAccountData = async () => {
			try {
				// const {data} = await axios.get(`/api/lesson/card`)
				// console.log(data)
			} catch (error) {
				console.error(error);
			}
		};
		fetchAccountData();
	});
	const handleAccountClick = () => {
		const accountNumElement = accountNumRef.current;
		if (accountNumElement) {
			const accountNumValue = accountNumElement.innerText;

			console.log('클릭된 Typography의 값:', accountNumValue);
			navigate(`/accountdetail/${accountNumValue}`);
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<main>
				<Box
					sx={{
						bgcolor: 'background.paper',
					}}
				>
					<Container sx={{ py: 2 }} maxWidth="md">
						<Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="">
							<div>계좌 목록</div>
							<Button variant="outlined">shop 목록</Button>
						</Stack>
					</Container>
				</Box>
				<Container sx={{ py: 2 }} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{cards.map((card) => (
							<Grid item key={card} xs={12}>
								<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
									<CardContent sx={{ flexGrow: 1 }} onClick={handleAccountClick}>
										<Typography
											gutterBottom
											variant="h5"
											component="h2"
											id="accountNum"
											ref={accountNumRef}
										>
											110110
										</Typography>
										<Typography>금액</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" href="/transfer">
											이체
										</Button>
										<Button size="small">삭제</Button>
									</CardActions>
								</Card>
							</Grid>
						))}

						<Grid item xs={12}>
							<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
								<Button variant="contained" href="/add" className="btn btn-primary">
									추가
								</Button>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</main>
		</ThemeProvider>
	);
}
export default MainPage;
