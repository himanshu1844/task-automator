import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({ maxRetriesPerRequest: null });

const action = async () => {
  // Simulate some asynchronous work
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Action completed');
      resolve();
    }, 1000);
  });

}
const worker = new Worker(
  'try',
  async job => {
    
    console.log(`message received id: ${job.id}`);
    console.log(`message received name: ${job.name}`);
    console.log(`message received data: ${JSON.stringify(job.data)}`);
    
   await action();

  },
  { connection },
);