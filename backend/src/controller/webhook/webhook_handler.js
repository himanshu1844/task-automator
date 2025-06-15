import knex from '../db'; // Adjust this path to your DB setup
import stepQueue from '../queue'; // Your Bull/queue instance

export async function webhookHandler(req, res) {
  const { flowId } = req.params;

  if (!flowId) {
    return res.status(400).json({ error: 'Missing flowId in URL params' });
  }

  try {
    // 1. Fetch all steps for the given flow, ordered
    const steps = await knex('steps')
      .where({ flow_id: flowId })
      .orderBy('order_index', 'asc');

    if (steps.length === 0) {
      return res.status(404).json({ error: 'No steps found for this flow' });
    }

    // 2. Add each step to the queue
    for (const step of steps) {
      await stepQueue.add('run-step', {
        stepId: step.id,
        flowId: step.flow_id,
        type: step.type,
        config: step.config,
        serviceId: step.service_id,
        authTokenId: step.auth_token_id,
        orderIndex: step.order_index
      });
    }

    return res.status(200).json({
      message: 'Steps added to queue',
      count: steps.length
    });
  } catch (error) {
    console.error('Webhook Handler Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
