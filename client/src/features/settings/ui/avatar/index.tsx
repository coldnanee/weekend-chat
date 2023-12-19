"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useProfileStore } from "@/entities/profile";
import { TSettingsForm } from "@/entities/settings";
import { DefaultAvatar } from "@/shared";

import cl from "./index.module.scss";

export const SettingsAvatar = () => {
	const [previewAvatarPath, setPreviewAvatarPath] = useState<string>("");

	const { watch, register, reset } = useFormContext<TSettingsForm>();

	const watchedImage = watch("avatar");

	const { profile } = useProfileStore();

	// const removeAvatar = () => {
	// 	setPreviewAvatarPath("");
	// 	removeProfileAvatar();
	// 	reset({ avatar: null });
	// };

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
	}, [watchedImage]); //eslint-disable-line

	return (
		<div className={cl.root}>
			<label htmlFor="#settings-avatar">
				<DefaultAvatar
					src={previewAvatarPath || profile?.avatar}
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
				{/* {(profile?.avatar || previewAvatarPath) && (
					<SettingsButton
						onClick={removeAvatar}
						border={false}>
						<AiFillDelete size="20px" />
					</SettingsButton>
				)} */}
			</div>
		</div>
	);
};
