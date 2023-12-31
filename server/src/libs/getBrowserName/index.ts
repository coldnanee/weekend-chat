import type { TBrowserInfo } from "../../types";

export const getBrowserName = (browserInfo: TBrowserInfo): string =>
	browserInfo
		? `${
				browserInfo?.type === "browser"
					? browserInfo.name + " " + browserInfo.version
					: browserInfo?.type
		  }`
		: "";
