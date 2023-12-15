import { createMetadata } from "@/shared";

import { NotFound } from "@/widgets/not-found";

export const metadata = createMetadata("404");

export default function NotFoundPage() {
	return <NotFound />;
}
