import type {textType} from "@/@types";

export const deletingTextStorage = (props: number) => {
	let initialState = JSON.parse(localStorage.getItem(`texts`) || "[]");
	initialState = initialState.filter((value: textType) => value.id !== props);
	localStorage.setItem(`texts`, JSON.stringify(initialState));
};
