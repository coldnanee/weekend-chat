"use client";

import { useEffect, useState, useRef, type MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { useProfileStore } from "@/entities/profile";
import { TSettingsForm } from "@/entities/settings";
import { DefaultAvatar } from "@/shared";

import { useAvatarStore } from "../../model";
import { TSettingsAvatarMenuItem } from "../../types";
import { SettingsAvatarMenuItem } from "../avatar-menu-item";

import cl from "./index.module.scss";

export const SettingsAvatar = () => {
	const [previewAvatarPath, setPreviewAvatarPath] = useState<string>("");

	const isTouchDevice = useRef<boolean | number>(false);

	const { watch, register, reset } = useFormContext<TSettingsForm>();
	const { isMenuShow, setMenuShow } = useAvatarStore();

	const watchedImage = watch("avatar");

	const { profile, removeProfileAvatar } = useProfileStore();

	const removeAvatar = () => {
		setPreviewAvatarPath("");
		removeProfileAvatar();
		reset({ avatar: null });
		setMenuShow(false);
	};

	useEffect(() => {
		isTouchDevice.current =
			"ontouchstart" in window || navigator.maxTouchPoints;
	}, []);

	const settingsMenuArr: TSettingsAvatarMenuItem[] = [
		{
			label: "Change avatar",
			Picture: TfiReload,
			labelId: "#settings-avatar"
		}
	];

	if (watchedImage || profile?.avatar) {
		settingsMenuArr.push({
			label: "Delete avatar",
			cb: removeAvatar,
			Picture: RiDeleteBin6Line
		});
	}

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
		} finally {
			setMenuShow(false);
		}
	}, [watchedImage]); //eslint-disable-line

	const onAvatarClick = (e: MouseEvent<HTMLDivElement>) => {
		if (!isTouchDevice.current) {
			return;
		}
		e.stopPropagation();
		setMenuShow(!isMenuShow);
	};

	const rootMenuClasses = [cl.root__menu];

	if (isMenuShow) {
		rootMenuClasses.push(cl.root__menu_visible);
	}

	return (
		<div
			className={cl.root}
			onClick={onAvatarClick}>
			<DefaultAvatar
				src={previewAvatarPath || profile?.avatar}
				className={cl.root__avatar}
				alt="avatar"
				width={100}
				height={100}
			/>
			<input
				{...register("avatar", { minLength: 8 })}
				className={cl.root__input}
				type="file"
				id="#settings-avatar"
			/>
			<ul className={rootMenuClasses.join(" ")}>
				{settingsMenuArr.map((i) => (
					<SettingsAvatarMenuItem
						item={i}
						key={i.label}
					/>
				))}
			</ul>
		</div>
	);
};
