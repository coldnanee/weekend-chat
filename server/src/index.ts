import cluster from "cluster";

import { master, worker } from "./bin";

import { config } from "dotenv";
config({ path: "./config/.env" });

cluster.isPrimary ? master() : worker();
