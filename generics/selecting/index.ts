import type {textType} from "@/@types";

export const selectingTextStorage = (props: number) => {
	const initialState = JSON.parse(localStorage.getItem(`texts`) || "[]");
	const updatingText = initialState.map((value: textType) =>
		value.id === props
			? {
					id: value.id,
					text: value.text,
					select: !value.select,
			  }
			: value
	);
	localStorage.setItem(`texts`, JSON.stringify(updatingText));
};
