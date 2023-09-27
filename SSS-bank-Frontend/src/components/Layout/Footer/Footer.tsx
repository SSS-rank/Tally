import React from 'react';

const Footer = () => {
	const footerStyle: React.CSSProperties = {
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100px',
		backgroundColor: '#91C0EB',
		position: 'relative',
		bottom: 0,
		width: '100%',
	};

	const strongStyle: React.CSSProperties = {
		whiteSpace: 'nowrap', // 텍스트의 줄 바꿈 방지
	};

	return (
		<footer style={footerStyle}>
			<div>
				Copyright 2023. <strong style={strongStyle}>Team A108 SSS.</strong> <br /> All Rights
				Reserved.
			</div>
		</footer>
	);
};

export default Footer;
