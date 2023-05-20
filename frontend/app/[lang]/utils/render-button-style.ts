export function renderButtonStyle(type: string) {
	switch (type) {
		case "primary":
			return "btn-primary mx-2";
		case "secondary":
			return "btn-secondary mx-2";
		default:
			return "btn-primary mx-2";
	}
}
