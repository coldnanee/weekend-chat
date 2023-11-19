import cluster from "cluster";

import http from "http";

import { setupMaster } from "@socket.io/sticky";
import { setupPrimary } from "@socket.io/cluster-adapter";

import os from "os";

export const master = () => {
	const { PORT } = process.env as { PORT: string };

	const httpServer = http.createServer();

	setupMaster(httpServer, {
		loadBalancingMethod: "least-connection"
	});

	setupPrimary();

	httpServer.listen(PORT);

	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}

	cluster.on("exit", () => {
		cluster.fork();
	});
};
