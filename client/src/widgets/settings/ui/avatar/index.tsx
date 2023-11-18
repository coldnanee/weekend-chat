"use client";

import cl from "./index.module.scss";

import Image from "next/image";

import DefaultAvatar from "../../images/default-avatar.svg";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import type { TSettingsForm } from "../..";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { RxUpdate } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";

import { SettingsButton } from "../button";

export const SettingsAvatar = () => {
	const [previewAvatarPath, setPreviewAvatarPath] = useState<string>("");

	const { watch, register, reset } = useFormContext<TSettingsForm>();

	const watchedImage = watch("avatar");

	const avatar = useAppSelector((state) => state.profile.profile?.avatar);

	useEffect(() => {
		try {
			const accessedImagesExt = "png, webp, jpg, jpeg";

			if (watchedImage && watchedImage[0]) {
				console.log(watchedImage);
				const imageExt = watchedImage[0].name.split(".")[1];

				console.log(imageExt);

				if (!accessedImagesExt.includes(imageExt)) {
					reset({ avatar: undefined });
					throw Error(`You can only use ${accessedImagesExt} files`);
				}

				const path = URL.createObjectURL(watchedImage[0]);
				setPreviewAvatarPath(path);
			}
		} catch (e) {
			alert(e);
		}
	}, [watchedImage]);

	return (
		<div className={cl.root}>
			<label htmlFor="#settings-avatar">
				<Image
					src={previewAvatarPath || avatar || DefaultAvatar}
					className={cl.root__avatar}
					alt="avatar"
					width={100}
					height={100}
					priority
				/>
			</label>
			<input
				{...register("avatar")}
				className={cl.root__input}
				type="file"
				id="#settings-avatar"
			/>
			<div className={cl.root__buttons}>
				<SettingsButton border={false}>
					<RxUpdate size="20px" />
				</SettingsButton>
				<SettingsButton border={false}>
					<AiFillDelete size="20px" />
				</SettingsButton>
			</div>
		</div>
	);
};
