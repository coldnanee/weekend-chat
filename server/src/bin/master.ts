import cluster from "cluster";

import os from "os";

export const master = () => {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}

	cluster.on("exit", () => {
		cluster.fork();
	});
};
