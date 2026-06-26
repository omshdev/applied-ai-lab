import { Worker } from 'bullmq';
import IORedis from "ioredis"

// @ts-ignore
const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  'production-ingestion',
  async job => {
    console.log(job.data);
  },
  // @ts-ignore
  { connection }
);

worker.on("completed",job=>{
  console.log(`${job.id} has complted!`);
});

worker.on("failed",(job,err)=>{
  console.log(`${job?.id} has failed with error message ${err}`);
})
