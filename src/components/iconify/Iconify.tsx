import React, { forwardRef } from 'react';

// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';
// import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

interface IconifyProps {
	icon: string;
	width?: number | string;
	sx?: any;
}

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
	({ icon, width = 20, sx, ...other }, ref) => (
		<Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
	),
);

Iconify.displayName = 'Iconify';

export default Iconify;
