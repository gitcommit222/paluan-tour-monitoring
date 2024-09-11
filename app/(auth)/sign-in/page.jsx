import { Label, TextInput } from "flowbite-react";
import React from "react";

const SignInPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-[400px] h-[600px] shadow-md rounded-lg p-5">
				<h1 className="w-full text-center font-semibold text-[25px] tracking-wide">
					SIGN IN
				</h1>
				<div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							type="email"
							placeholder="name@flowbite.com"
							required
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
