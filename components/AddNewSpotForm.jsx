import { FileInput, Label, Radio, Select, TextInput } from "flowbite-react";
import React from "react";

const AddNewSpotForm = () => {
	return (
		<div>
			<form className="space-y-3">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="placeName" value="Place Name" />
					</div>
					<TextInput id="placeName" type="text" sizing="md" />
				</div>
				<div>
					<div className="mb-2 block" aria-labelledby="default-popover">
						<Label htmlFor="categories" value="Select your country" />
					</div>
					<Select id="categories" required>
						<option>Historial significance</option>
						<option>Cultural value</option>
						<option>Political significance</option>
						<option>Nature</option>
						<option>Natural or built beauty</option>
						<option>Leisure</option>
						<option>Amusement and fun</option>
					</Select>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="address" value="Address" />
					</div>
					<TextInput id="address" type="text" sizing="md" />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="ownerName" value="Owner" />
					</div>
					<TextInput id="ownerName" type="text" sizing="md" />
				</div>
				<div>
					<div className="flex w-full items-center justify-center">
						<Label
							htmlFor="dropzone-file"
							className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
						>
							<div className="flex flex-col items-center justify-center pb-6 pt-5">
								<svg
									className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<FileInput id="dropzone-file" className="hidden" />
						</Label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddNewSpotForm;
