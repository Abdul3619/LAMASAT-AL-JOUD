import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildBookingEmail } from '../bookingEmail.js';

const booking = {
  userId: 'u1', serviceId: 'hair', date: '2026-10-01', time: '14:30', status: 'pending',
  userName: 'Sara Ali', userEmail: 'sara@example.com',
};

test('includes the service name, date, time, customer and booking id', () => {
  const m = buildBookingEmail(booking, 'abc123');
  assert.equal(m.subject, 'New booking: Hair Styling on 2026-10-01 at 14:30 - Sara Ali');
  for (const part of ['Hair Styling', '2026-10-01', '14:30 (Riyadh time)', 'Sara Ali', 'sara@example.com', 'abc123']) {
    assert.ok(m.text.includes(part), `text missing ${part}`);
    assert.ok(m.html.includes(part), `html missing ${part}`);
  }
  assert.equal(m.replyTo, 'sara@example.com');
});

test('escapes HTML and blocks header injection from customer-supplied fields', () => {
  const m = buildBookingEmail({ ...booking, userName: '<script>x</script>\r\nBcc: evil@example.com' }, 'id');
  assert.ok(!m.html.includes('<script>'));
  assert.ok(!/[\r\n]/.test(m.subject));
  assert.ok(!m.text.split('\n').some((line) => line.startsWith('Bcc:')));
});

test('falls back sensibly for unknown services and missing email', () => {
  const m = buildBookingEmail({ ...booking, serviceId: 'massage', userEmail: '' }, 'id');
  assert.ok(m.subject.includes('massage'));
  assert.ok(m.text.includes('Customer email: not provided'));
  assert.equal(m.replyTo, undefined);
});
