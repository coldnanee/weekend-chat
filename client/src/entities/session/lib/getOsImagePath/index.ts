import AndroidImage from "./android.svg";
import LinuxImage from "./linux.svg";
import WindowsImage from "./windows.svg";

export const getOsImagePath = (os: string): string => {
	switch (os) {
		case "Linux":
			return LinuxImage;
		case "Windows 10":
			return WindowsImage;
		case "Android OS":
			return AndroidImage;
		default:
			return "";
	}
};
