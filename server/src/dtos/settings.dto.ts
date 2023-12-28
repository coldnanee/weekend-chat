import type { TProfileSettings } from "../types";

export class SettingsDto {
	public language: string;
	constructor(settings: TProfileSettings) {
		this.language = settings.language;
	}
}
