import Image from "next/image";

import AvatarImage from "../../images/default-avatar.svg";

import cl from "./index.module.scss";

export const DefaultAvatar = ({
	className,
	src,
	alt,
	width,
	height
}: {
	className: string;
	src?: string;
	alt: string;
	width: number;
	height: number;
}) => {
	return (
		<Image
			className={[className, cl.root].join(" ")}
			src={src || AvatarImage}
			width={width}
			height={height}
			alt={alt}
			priority
		/>
	);
};
