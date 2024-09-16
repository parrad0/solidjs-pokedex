export const getPokemonIconAndColor = (
	type: string,
	props?: { class?: string },
) => {
	switch (type.toLowerCase()) {
		case "bug":
			return {
				icon: "/Bug.png",
				color: "bg-green-300",
				secondaryColor: "bg-green-100",
			};
		case "dark":
			return {
				icon: "/Dark.png",
				color: "bg-gray-300",
				secondaryColor: "bg-gray-100",
			};
		case "dragon":
			return {
				icon: "/Dragon.png",
				color: "bg-indigo-300",
				secondaryColor: "bg-indigo-100",
			};
		case "fairy":
			return {
				icon: "/Fairy.png",
				color: "bg-pink-300",
				secondaryColor: "bg-pink-100",
			};
		case "fighter":
		case "fighting":
			return {
				icon: "/Fighting.png",
				color: "bg-red-300",
				secondaryColor: "bg-red-100",
			};
		case "fire":
			return {
				icon: "/Fire.png",
				color: "bg-red-300",
				secondaryColor: "bg-red-100",
			};
		case "flying":
			return {
				icon: "/Flying.png",
				color: "bg-blue-300",
				secondaryColor: "bg-blue-100",
			};
		case "ghost":
			return {
				icon: "/Ghost.png",
				color: "bg-purple-300",
				secondaryColor: "bg-purple-100",
			};
		case "grass":
			return {
				icon: "/Grass.png",
				color: "bg-green-300",
				secondaryColor: "bg-green-100",
			};
		case "ground":
			return {
				icon: "/Ground.png",
				color: "bg-yellow-300",
				secondaryColor: "bg-yellow-100",
			};
		case "ice":
			return {
				icon: "/Ice.png",
				color: "bg-blue-200",
				secondaryColor: "bg-blue-50",
			};
		case "normal":
			return {
				icon: "/Normal.png",
				color: "bg-gray-300",
				secondaryColor: "bg-gray-100",
			};
		case "poison":
			return {
				icon: "/Poison.png",
				color: "bg-purple-300",
				secondaryColor: "bg-purple-100",
			};
		case "psychic":
			return {
				icon: "/Psychic.png",
				color: "bg-pink-300",
				secondaryColor: "bg-pink-100",
			};
		case "rock":
			return {
				icon: "/Rock.png",
				color: "bg-yellow-300",
				secondaryColor: "bg-yellow-100",
			};
		case "steel":
			return {
				icon: "/Steel.png",
				color: "bg-gray-300",
				secondaryColor: "bg-gray-100",
			};
		case "water":
			return {
				icon: "/Water.png",
				color: "bg-blue-300",
				secondaryColor: "bg-blue-100",
			};
		case "electric":
			return {
				icon: "/Electric.png",
				color: "bg-yellow-200",
				secondaryColor: "bg-yellow-50",
			};
		default:
			return {
				icon: "/Water.png",
				color: "bg-gray-300",
				secondaryColor: "bg-gray-100",
			};
	}
};
