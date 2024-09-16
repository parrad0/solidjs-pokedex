import type { Component } from "solid-js";

interface ElectricProps {
	class?: string;
}

const Electric: Component<ElectricProps> = (props) => {
	return (
		<svg
			width="90"
			height="145"
			viewBox="0 0 90 145"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15.8675 0.804657C15.8397 0.724304 15.8996 0.640503 15.9845 0.640503H66.5614C66.6157 0.640503 66.6638 0.675824 66.6798 0.727629L89.9105 75.7823C89.935 75.8619 89.8756 75.9427 89.7921 75.9427H56.1211C56.0801 75.9427 56.0505 75.9818 56.0618 76.0214L75.373 144.001C75.4107 144.133 75.2377 144.219 75.1553 144.109L0.108921 44.3093C0.0476084 44.2278 0.105797 44.1113 0.207778 44.1113H30.767C30.8095 44.1113 30.8393 44.0694 30.8252 44.0292L15.8675 0.804657Z"
				fill="url(#paint0_linear)"
			/>
			<defs>
				<linearGradient id="paint0_linear" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#F4D23C" stop-opacity="1" />
					<stop offset="100%" stop-color="#F4D23C" stop-opacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default Electric;
