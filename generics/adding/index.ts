import {textType} from "@/@types";

export const addingTextStorage = (props: string) => {
	const initialState = JSON.parse(localStorage.getItem(`texts`) || "[]");
	const newText: textType = {
		id: Date.now(),
		text: props,
		select: false,
	};
	initialState.push(newText);
	localStorage.setItem(`texts`, JSON.stringify(initialState));
};
