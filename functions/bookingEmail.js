// Builds the notification email for a new booking. Kept free of Firebase imports so it can be unit tested.
const SERVICES = {
  facial: 'Facial Treatment',
  hair: 'Hair Styling',
  nails: 'Nail Spa',
};

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Strips line breaks so user-supplied values can never inject extra email headers.
const oneLine = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

export function buildBookingEmail(booking, appointmentId) {
  const service = SERVICES[booking.serviceId] || booking.serviceId || 'Unknown service';
  const name = oneLine(booking.userName) || 'Guest';
  const email = oneLine(booking.userEmail);
  const rows = [
    ['Service', service],
    ['Date', booking.date],
    ['Time', `${booking.time} (Riyadh time)`],
    ['Customer', name],
    ['Customer email', email || 'not provided'],
    ['Status', booking.status],
    ['Booking ID', appointmentId],
  ];

  return {
    subject: oneLine(`New booking: ${service} on ${booking.date} at ${booking.time} - ${name}`),
    text: [
      'A new booking was made on the Amāra Beauty Lounge website.',
      '',
      ...rows.map(([label, value]) => `${label}: ${oneLine(value)}`),
      '',
      'View it in the Firebase console: Firestore > appointments.',
    ].join('\n'),
    html: `<p>A new booking was made on the Amāra Beauty Lounge website.</p>
<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
${rows.map(([label, value]) => `<tr><td style="color:#666">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`).join('\n')}
</table>
<p style="color:#666;font-size:12px">View it in the Firebase console: Firestore &gt; appointments.</p>`,
    replyTo: email || undefined,
  };
}
