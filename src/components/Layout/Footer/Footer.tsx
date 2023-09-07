import React from 'react';

const Footer = () => {
	const footerStyle: React.CSSProperties = {
		textAlign: 'center',
		lineHeight: '100px',
		backgroundColor: '#91C0EB',
	};

	return (
		<footer style={footerStyle}>
			Copyright 2023. <strong>Team A108 SSS</strong>. All Rights Reserved.
		</footer>
	);
};

export default Footer;
