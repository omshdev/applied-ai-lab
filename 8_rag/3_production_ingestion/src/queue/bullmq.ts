import { Queue } from "bullmq";

const myQueue = new Queue('production-ingestion');


export async function addJobs(){
    await myQueue.add('dwqdqwjfqwfjf',{"dek":"marjayen"});
    await myQueue.add('dewd',{"dek":"jyad"});
};
