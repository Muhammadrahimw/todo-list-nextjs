"use client";

import {textType} from "@/@types";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {addingTextStorage} from "@/generics/adding";
import {deletingTextStorage} from "@/generics/deleting";
import {editingTextStorage} from "@/generics/editing";
import {Pencil, Trash2} from "lucide-react";
import {useEffect, useRef, useState} from "react";

const Home = () => {
	const [data, setData] = useState<textType[]>([]);
	const [state, setState] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	let [editText, setEditText] = useState<textType>();
	const addingRef = useRef<HTMLInputElement>(null);
	const editingRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (editText && editingRef.current) {
			editingRef.current.value = editText.text;
		}
	}, [editText]);

	useEffect(() => {
		setData(JSON.parse(localStorage.getItem(`texts`) || "[]"));
	}, [state]);

	return (
		<section className="w-full h-screen flex flex-col justify-center items-center">
			<div className="w-[28em]">
				<Input placeholder="Search" className="w-full" type="text" />
				{edit ? (
					<div className="flex items-center justify-between gap-2 my-4">
						<Input
							ref={editingRef}
							placeholder="Edit text"
							className="w-full"
							type="text"
							defaultValue={editText?.text}
						/>
						<Button
							onClick={() => {
								editingRef.current?.value && editText
									? editingTextStorage({
											id: editText.id,
											text: editingRef.current.value,
									  })
									: "";
								if (editingRef.current) {
									editingRef.current.value = "";
								}
								setEdit(false);
								setState(!state);
							}}
							variant={"outline"}
							className="px-5">
							<Pencil /> Edit
						</Button>
					</div>
				) : (
					<div className="flex items-center justify-between gap-2 my-4">
						<Input
							ref={addingRef}
							placeholder="write text"
							className="w-full"
							type="text"
						/>
						<Button
							onClick={() => {
								addingRef.current?.value
									? addingTextStorage(addingRef.current.value)
									: "";
								if (addingRef.current) {
									addingRef.current.value = "";
								}
								setState(!state);
							}}
							variant={"outline"}
							className="px-5">
							Add
						</Button>
					</div>
				)}
				{data.map((value: textType) => (
					<div
						key={value.id}
						className="mt-2 flex items-center justify-between gap-2">
						<label
							htmlFor={`term-${value.id}`}
							className="flex cursor-pointer items-center justify-start gap-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:opacity-50 md:text-sm w-full truncate">
							<Checkbox id={`term-${value.id}`} />
							{value.text}
						</label>
						<Button
							onClick={() => {
								deletingTextStorage(value.id);
								setState(!state);
							}}
							variant={`outline`}>
							<Trash2 />
						</Button>
						<Button
							onClick={() => {
								setEditText(value);
								setEdit(true);
							}}
							variant={`outline`}>
							<Pencil />
						</Button>
					</div>
				))}
				<Progress className="mt-5" value={38} />
			</div>
		</section>
	);
};

export default Home;
