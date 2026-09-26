import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

// Stub the mail transport so the real exported trigger can run without sending email.
const sent = [];
mock.module('nodemailer', {
  defaultExport: {
    createTransport: (options) => ({
      sendMail: async (message) => { sent.push({ options, message }); return { messageId: 'test-id' }; },
    }),
  },
});
process.env.GMAIL_APP_PASSWORD = 'test-app-password';

const { notifyNewBooking } = await import('../index.js');

test('a new appointments document sends one email to the owner', async () => {
  const booking = { userId: 'u1', serviceId: 'facial', date: '2026-10-02', time: '11:00', status: 'pending', userName: 'Mona', userEmail: 'mona@example.com' };
  await notifyNewBooking.run({ params: { appointmentId: 'appt-1' }, data: { data: () => booking } });
  assert.equal(sent.length, 1);
  const { options, message } = sent[0];
  assert.equal(message.to, 'abdulwahababdullahi3619@gmail.com');
  assert.equal(options.auth.user, 'abdulwahababdullahi3619@gmail.com');
  assert.equal(options.auth.pass, 'test-app-password');
  assert.ok(message.subject.includes('Facial Treatment'));
  assert.equal(message.replyTo, 'mona@example.com');
});

test('the trigger is bound to appointments/ in the site database', () => {
  const endpoint = notifyNewBooking.__endpoint;
  assert.equal(endpoint.eventTrigger.eventType, 'google.cloud.firestore.document.v1.created');
  assert.equal(endpoint.eventTrigger.eventFilters.database, 'ai-studio-lamasataljoudsal-dc6b3d84-e559-42ae-bcad-99ad1a459c6a');
  assert.equal(endpoint.eventTrigger.eventFilterPathPatterns.document, 'appointments/{appointmentId}');
  assert.equal(endpoint.eventTrigger.retry, true);
});
