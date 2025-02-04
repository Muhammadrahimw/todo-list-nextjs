"use client";

import {textType} from "@/@types";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {addingTextStorage} from "@/generics/adding";
import {deletingTextStorage} from "@/generics/deleting";
import {editingTextStorage} from "@/generics/editing";
import {selectingTextStorage} from "@/generics/selecting";
import {Pencil, Trash2} from "lucide-react";
import {useEffect, useRef, useState} from "react";

const Home = () => {
	const [data, setData] = useState<textType[]>([]);
	const [filteredData, setFilteredData] = useState<textType[]>([]);
	const [state, setState] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	const [editText, setEditText] = useState<textType>();
	const [progress, setProgress] = useState<number>(0);
	const addingRef = useRef<HTMLInputElement>(null);
	const editingRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	const searchFunc = () => {
		setFilteredData(
			data.filter((value) =>
				value.text.includes(searchRef.current?.value || "")
			)
		);
	};

	useEffect(() => {
		if (editText && editingRef.current) {
			editingRef.current.value = editText.text;
		}
	}, [editText]);

	useEffect(() => {
		setData(JSON.parse(localStorage.getItem(`texts`) || "[]"));
		setFilteredData(JSON.parse(localStorage.getItem(`texts`) || "[]"));
	}, [state]);

	useEffect(() => {
		const checkedTexts = data.filter((item) => item.select === true);
		const progressValue = (checkedTexts.length / data.length) * 100 || 0;
		setProgress(progressValue);
	}, [data]);

	return (
		<section className="w-full h-screen flex flex-col justify-center items-center">
			<div className="w-[28em] max-[550px]:w-[25em] max-[480px]:w-[22em] max-[400px]:w-[18em]">
				<Input
					onChange={() => searchFunc()}
					ref={searchRef}
					placeholder="Search"
					className="w-full"
					type="text"
				/>
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
								if (editingRef.current?.value && editText) {
									editingTextStorage({
										id: editText.id,
										text: editingRef.current.value,
										select: editText.select,
									});
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
								if (addingRef.current?.value) {
									addingTextStorage(addingRef.current.value);
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
				{filteredData?.map((value: textType) => (
					<div
						key={value.id}
						className="mt-2 flex items-center justify-between gap-2">
						<label
							htmlFor={`term-${value.id}`}
							className="flex cursor-pointer items-center justify-start gap-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:opacity-50 md:text-sm w-full truncate">
							<Checkbox
								checked={value.select}
								onCheckedChange={() => {
									selectingTextStorage(value.id);
									setState(!state);
								}}
								id={`term-${value.id}`}
							/>
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
				<Progress className="mt-5" value={progress} />
			</div>
		</section>
	);
};

export default Home;
