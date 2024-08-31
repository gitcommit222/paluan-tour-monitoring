"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const CustomModal = ({
	headerTitle,
	buttonName,
	mainContent,
	yesLabel,
	noLabel,
}) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button gradientDuoTone="cyanToBlue" onClick={() => setOpenModal(true)}>
				{buttonName}
			</Button>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>{headerTitle}</Modal.Header>
				<Modal.Body>{mainContent}</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOpenModal(false)}>{yesLabel}</Button>
					<Button color="gray" onClick={() => setOpenModal(false)}>
						{noLabel}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CustomModal;
