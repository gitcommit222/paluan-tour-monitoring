import React from "react";

const Loader = () => {
	return (
		<div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6">
				<svg
					className="w-36 h-36"
					viewBox="0 0 160 160"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#000" />
							<stop offset="100%" stopColor="#fff" />
						</linearGradient>
						<mask id="mask1">
							<rect x="0" y="0" width="160" height="160" fill="url(#grad)" />
						</mask>
						<mask id="mask2">
							<rect x="28" y="28" width="104" height="104" fill="url(#grad)" />
						</mask>
					</defs>

					<g>
						<g className="animate-[spin_2s_linear_infinite] origin-center">
							<circle
								className="animate-[ringStroke_2s_linear_infinite] origin-center"
								cx="80"
								cy="80"
								r="72"
								fill="none"
								stroke="#70B1E1"
								strokeWidth="16"
								strokeDasharray="452.39 452.39"
								strokeDashoffset="452"
								strokeLinecap="round"
								transform="rotate(-45,80,80)"
							/>
						</g>
					</g>
					<g mask="url(#mask1)">
						<g className="animate-[spin_2s_linear_infinite] origin-center">
							<circle
								className="animate-[ringStroke_2s_linear_infinite] origin-center"
								cx="80"
								cy="80"
								r="72"
								fill="none"
								stroke="hsl(193,90%,55%)"
								strokeWidth="16"
								strokeDasharray="452.39 452.39"
								strokeDashoffset="452"
								strokeLinecap="round"
								transform="rotate(-45,80,80)"
							/>
						</g>
					</g>

					<g>
						<g
							strokeWidth="4"
							strokeDasharray="12 12"
							strokeDashoffset="12"
							strokeLinecap="round"
							transform="translate(80,80)"
						>
							{[...Array(8)].map((_, index) => (
								<polyline
									key={index}
									className="animate-[tick_2s_linear_infinite]"
									style={{ animationDelay: `${-0.25 * index}s` }}
									stroke="hsl(223,10%,90%)"
									points="0,2 0,14"
									transform={`rotate(${45 * index},0,0) translate(0,40)`}
								/>
							))}
						</g>
					</g>
					<g mask="url(#mask1)">
						<g
							strokeWidth="4"
							strokeDasharray="12 12"
							strokeDashoffset="12"
							strokeLinecap="round"
							transform="translate(80,80)"
						>
							{[...Array(8)].map((_, index) => (
								<polyline
									key={index}
									className="animate-[tick_2s_linear_infinite]"
									style={{ animationDelay: `${-0.25 * index}s` }}
									stroke="hsl(223,90%,80%)"
									points="0,2 0,14"
									transform={`rotate(${45 * index},0,0) translate(0,40)`}
								/>
							))}
						</g>
					</g>

					<g>
						<g transform="translate(64,28)">
							<g
								className="animate-[arrows_2s_linear_infinite] origin-[16px_52px]"
								transform="rotate(45,16,52)"
							>
								<path
									fill="hsl(3,90%,55%)"
									d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
								/>
								<path
									fill="hsl(223,10%,90%)"
									d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
								/>
							</g>
						</g>
					</g>
					<g mask="url(#mask2)">
						<g transform="translate(64,28)">
							<g
								className="animate-[arrows_2s_linear_infinite] origin-[16px_52px]"
								transform="rotate(45,16,52)"
							>
								<path
									fill="hsl(333,90%,55%)"
									d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
								/>
								<path
									fill="hsl(223,90%,80%)"
									d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
								/>
							</g>
						</g>
					</g>
				</svg>
			</div>
			<div className="mt-4 text-white text-2xl font-bold animate-pulse">
				Loading
				<span className="animate-[ellipsis_1.5s_steps(4,end)_infinite]">
					...
				</span>
			</div>
		</div>
	);
};

export default Loader;
