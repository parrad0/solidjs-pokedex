const Water = (props: { class?: string }) => {
	return (
		<svg
			width="94"
			height="145"
			viewBox="0 0 94 145"
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
				fill="url(#gradient)"
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M93.7117 97.8605C93.7117 123.562 72.7982 144.397 47 144.397C21.2018 144.397 0.28833 123.562 0.28833 97.8605C0.28833 72.8642 44.4733 4.21355 46.8965 0.46727C46.9519 0.381841 47.0484 0.381841 47.1035 0.467271C49.5268 4.21355 93.7117 72.8642 93.7117 97.8605ZM39.2133 129.478C15.5096 124.291 19.5658 98.0335 19.5658 98.0335C19.5658 98.0335 26.0385 113.884 41.746 119.019C57.4532 124.153 76.4354 116.623 76.4354 116.623C76.4354 116.623 62.9171 134.664 39.2133 129.478Z"
			/>
		</svg>
	);
};

export default Water;
