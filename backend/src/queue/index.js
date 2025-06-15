import { Queue } from 'bullmq';

const myQueue = new Queue('try');

async function addJobs() {
  await myQueue.add("execute app 1",{action:"tweet",body:"Hello World1!"});
  await myQueue.add("execute app 1",{action:"tweet",body:"Hello World2!"});
  console.log("Jobs added to the queue");
  
}

await addJobs();