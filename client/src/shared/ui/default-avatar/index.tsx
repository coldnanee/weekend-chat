import Image from "next/image";

import AvatarImage from "./default-avatar.svg";

import cl from "./index.module.scss";

export const DefaultAvatar = ({
	className,
	src,
	alt,
	width,
	height
}: {
	className?: string;
	src?: string;
	alt: string;
	width: number;
	height: number;
}) => {
	return (
		<Image
			data-testid="default-avatar"
			className={[className, cl.root].join(" ")}
			src={src || AvatarImage}
			width={width}
			height={height}
			alt={alt}
			priority
			style={{ width, height }}
		/>
	);
};
