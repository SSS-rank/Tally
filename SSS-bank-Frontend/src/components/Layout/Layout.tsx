import React from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = (props: { children: React.ReactNode }) => {
	const wrapper: React.CSSProperties = {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	};

	const content: React.CSSProperties = {
		flex: '1',
	};

	if (window.location.pathname === '/') return <main>{props.children}</main>;

	return (
		<div>
			<div style={wrapper}>
				<Header />
				<div style={content}>
					<main>{props.children}</main>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
