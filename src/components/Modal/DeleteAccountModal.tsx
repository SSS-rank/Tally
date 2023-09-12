import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

interface DeleteAccountModalProps {
	open: boolean;

	handleClose: () => void;
	handleDelete: (password: string) => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
	open,
	handleClose,
	handleDelete,
}) => {
	const [password, setPassword] = useState('');

	const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleDeleteConfirm = () => {
		handleDelete(password);
		setPassword('');
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					maxWidth: 400,
					width: '90%',
					textAlign: 'center',
				}}
			>
				<h2 id="modal-title">계좌 삭제</h2>
				<p id="modal-description">정말로 계좌를 삭제하시겠습니까?</p>
				<TextField
					label="비밀번호"
					type="password"
					variant="outlined"
					fullWidth
					value={password}
					onChange={handleChangePassword}
					sx={{ mb: 2 }}
				/>
				<Button variant="contained" onClick={handleDeleteConfirm}>
					삭제
				</Button>
				<Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
					취소
				</Button>
			</Box>
		</Modal>
	);
};

export default DeleteAccountModal;
