import Image from "next/image";

import AvatarImage from "../../images/default-avatar.svg";

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
			className={className}
			src={src || AvatarImage}
			width={width}
			height={height}
			alt={alt}
			priority
		/>
	);
};
