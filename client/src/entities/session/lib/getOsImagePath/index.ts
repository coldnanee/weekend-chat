import AndroidImage from "../../images/android.svg";
import LinuxImage from "../../images/linux.svg";
import WindowsImage from "../../images/windows.svg";

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
