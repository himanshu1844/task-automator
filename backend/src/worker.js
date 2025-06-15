import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import runGmailStep from './apps/gmail/actions/send_mail/index.js';


const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  'step',
  async (job) => {
    const { stepId, flowId, type, config, authTokenId, serviceId } = job.data;

    console.log(`Processing step ${stepId} of type ${type}`);

    try {
      switch (type) {
        case 'gmail':
          await runGmailStep({ stepId, flowId, config, authTokenId });
          break;
       
      }

      console.log(`Step ${stepId} processed successfully.`);
      return { success: true };
    } catch (error) {
      console.error(`Error processing step ${stepId}:`, error);
      throw error; // This marks the job as failed
    }
  },
  { connection }
);
