import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import logo from '../../../asset/image/sss.png';

const pages = ['조회', '이체', 'SHOP'];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const navigate = useNavigate();

	const handleClickNavMenu = (page: string) => {
		console.log(page);
		// setAnchorElNav(null);
		if (page === '조회') {
			navigate('/main');
		} else if (page === '이체') {
			navigate('/transfer');
		} else if (page === 'SHOP') {
			navigate('/shop');
		}
	};

	const handleCloseNavMenu = () => {
		console.log('!');
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					<Box component="a" href="/main" sx={{ display: { xs: 'none', md: 'flex' } }}>
						<Box
							component="img"
							src={logo}
							sx={{
								mr: 2,
								width: '100px',
								display: { xs: 'none', md: 'flex' },
							}}
						></Box>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={() => handleClickNavMenu(page)}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box component="a" href="/main">
						<Box
							component="img"
							src={logo}
							sx={{ width: '100px', mr: 2, display: { xs: 'flex', md: 'none' } }}
						></Box>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => handleClickNavMenu(page)}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Button variant="text" sx={{ color: '#fff' }}>
							로그아웃
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
