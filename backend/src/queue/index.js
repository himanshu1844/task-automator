import { Queue } from 'bullmq';

const stepQueue = new Queue('step');

async function addJobs() {
  await stepQueue.add("execute app 1",{action:"tweet",body:"Hello World1!"});
  await stepQueue.add("execute app 1",{action:"tweet",body:"Hello World2!"});
  console.log("Jobs added to the queue");
  
}

export default stepQueue;