import React from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = (props: { children: React.ReactNode }) => {
	return (
		<div>
			<div>
				<Header />
				<main>{props.children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
