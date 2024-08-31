import { Button, Popover } from "flowbite-react";

const CustomPopover = ({ button, title, mainContent, trigger }) => {
	return (
		<Popover
			aria-labelledby="default-popover"
			trigger={trigger}
			content={
				<div className="text-sm text-gray-500">
					{title && (
						<div className="border-b border-gray-200 bg-gray-100 px-3 py-2 ">
							<h3
								id="default-popover"
								className="font-semibold text-gray-900 dark:text-white"
							>
								{title}
							</h3>
						</div>
					)}
					<div className="px-3 py-2">{mainContent}</div>
				</div>
			}
		>
			{button}
		</Popover>
	);
};

export default CustomPopover;
