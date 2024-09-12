"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

const CustomModal = ({
	buttonName,
	mainContent,
	size = "lg",
	btnColor,
	type = "form",
}) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button color={btnColor} onClick={() => setOpenModal(true)}>
				{buttonName}
			</Button>
			<Modal show={openModal} size={size} onClose={() => setOpenModal(false)}>
				<Modal.Body>
					{mainContent}
					{type == "logout" && (
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={async () => {
									setOpenModal(false);
								}}
							>
								{"Yes, I'm sure"}
							</Button>
							<Button color="gray" onClick={() => setOpenModal(false)}>
								No, cancel
							</Button>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CustomModal;
