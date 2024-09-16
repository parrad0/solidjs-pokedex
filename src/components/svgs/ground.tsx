export const Ground = (props: { class?: string }) => {
	return (
		<svg
			width="144"
			height="105"
			viewBox="0 0 144 105"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class={props.class}
		>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop
						offset="0%"
						style={{ "stop-color": "#5090D6", "stop-opacity": 1 }}
					/>{" "}
					// Color sólido
					<stop
						offset="100%"
						style={{ "stop-color": "#5090D6", "stop-opacity": 0 }}
					/>{" "}
					// Transparente
				</linearGradient>
			</defs>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M31.7154 104.193C31.6763 104.193 31.649 104.155 31.6619 104.118L68.4255 0.237761C68.4337 0.215177 68.4551 0.200073 68.479 0.200073H107.725C107.749 0.200073 107.771 0.21529 107.779 0.238015L143.997 104.118C144.009 104.155 143.982 104.193 143.943 104.193H32.8201H31.7154ZM0.0571056 104.6C0.0176198 104.6 -0.00971692 104.56 0.00413349 104.524L27.3809 31.4346C27.3892 31.4124 27.4103 31.3977 27.4339 31.3977H51.2212C51.2606 31.3977 51.2878 31.4368 51.2743 31.4737L24.8018 104.563C24.7937 104.585 24.7724 104.6 24.7486 104.6H0.0571056Z"
				fill="#D97845"
			/>
		</svg>
	);
};
