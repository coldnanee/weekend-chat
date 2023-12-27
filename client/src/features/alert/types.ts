type TAlertTypes = "error" | "successfully";
export type TAlert = { type: TAlertTypes; message: string } | null;
