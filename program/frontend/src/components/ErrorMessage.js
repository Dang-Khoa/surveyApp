import React, { useRef, useState } from 'react';
import { 
	AlertDialog, AlertDialogOverlay, AlertDialogContent, 
	AlertDialogBody, AlertDialogFooter, AlertDialogHeader, 
	AlertDialogCloseButton, Button
} from '@chakra-ui/react';

export default function ErrorMessage({ message }) {
	const [isOpen, setIsOpen] = useState(true);
	const cancelRef = useRef();
	const onClose = () => { setIsOpen(false); }

	return (
		<AlertDialog
			isOpen={isOpen} motionPreset='slideInRight'
			leastDestructiveRef={cancelRef}
			onClose={onClose} isCentered size='sm'
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="2xl" fontWeight="bold">
						Fehler!
					</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody fontSize='lg'>
						{message}
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Ok
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}
