import ContentLoader from "react-content-loader";

export const ChatSkeleton = () => {
	return (
		<li>
			<ContentLoader
				speed={4}
				width={289}
				height={65}
				viewBox="0 0 289 65"
				backgroundColor="#2e333d"
				foregroundColor="#3d3f43">
				<circle
					cx="33"
					cy="33"
					r="23"
				/>
				<rect
					x="66"
					y="37"
					rx="10"
					ry="10"
					width="212"
					height="14"
				/>
				<rect
					x="66"
					y="14"
					rx="10"
					ry="10"
					width="212"
					height="14"
				/>
			</ContentLoader>
		</li>
	);
};
