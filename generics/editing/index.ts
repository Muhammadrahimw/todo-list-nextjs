import type {textType} from "@/@types";

export const editingTextStorage = (props: textType) => {
	const initialState = JSON.parse(localStorage.getItem(`texts`) || "[]");
	const editingTexts = initialState.map((value: textType) =>
		value.id === props.id
			? {
					id: value.id,
					text: props.text,
			  }
			: value
	);
	localStorage.setItem(`texts`, JSON.stringify(editingTexts));
};
