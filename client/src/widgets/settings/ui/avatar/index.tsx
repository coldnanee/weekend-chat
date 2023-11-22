"use client";

import cl from "./index.module.scss";

import Image from "next/image";

import { DefaultAvatar } from "@/shared";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

import type { TSettingsForm } from "../..";

import { removeProfileAvatarAction } from "@/entities/profile";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { AiFillDelete } from "react-icons/ai";

import { SettingsButton } from "../button";

export const SettingsAvatar = () => {
	const dispatch = useAppDispatch();

	const [previewAvatarPath, setPreviewAvatarPath] = useState<string>("");

	const { watch, register, reset } = useFormContext<TSettingsForm>();

	const watchedImage = watch("avatar");

	const avatar = useAppSelector((state) => state.profile.profile?.avatar);

	const removeAvatar = () => {
		setPreviewAvatarPath("");
		dispatch(removeProfileAvatarAction());
		reset({ avatar: null });
	};

	useEffect(() => {
		try {
			const accessedImagesExt = "png, webp, jpg, jpeg";

			if (watchedImage && watchedImage[0]) {
				const imageExt = watchedImage[0].name.split(".")[1];

				if (!accessedImagesExt.includes(imageExt)) {
					reset({ avatar: [] });
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
				<DefaultAvatar
					src={previewAvatarPath || avatar}
					className={cl.root__avatar}
					alt="avatar"
					width={100}
					height={100}
				/>
			</label>
			<input
				{...register("avatar", { minLength: 8 })}
				className={cl.root__input}
				type="file"
				id="#settings-avatar"
			/>
			<div className={cl.root__buttons}>
				{(avatar || previewAvatarPath) && (
					<SettingsButton
						onClick={removeAvatar}
						border={false}>
						<AiFillDelete size="20px" />
					</SettingsButton>
				)}
			</div>
		</div>
	);
};
