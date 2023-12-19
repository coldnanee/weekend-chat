import { NotFound } from "@/widgets/not-found";

import { createMetadata } from "@/shared";

export const metadata = createMetadata("404");

export default function NotFoundPage() {
	return <NotFound />;
}
