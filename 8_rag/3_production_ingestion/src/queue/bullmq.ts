import { Queue } from "bullmq";

export const myQueue = new Queue('production-ingestion');
