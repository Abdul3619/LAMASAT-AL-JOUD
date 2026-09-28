// Emails the salon owner whenever a booking is created in Firestore, so no booking goes unnoticed.
// Runs server-side on every new document in appointments/, regardless of which device made the booking.
// Deploy steps: see functions/README.md.
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import nodemailer from 'nodemailer';
import { buildBookingEmail } from './bookingEmail.js';

// The site's Firestore database (from firebase-config.json).
const DATABASE_ID = 'ai-studio-lamasataljoudsal-dc6b3d84-e559-42ae-bcad-99ad1a459c6a';
// Must be compatible with the database's location; change if deploy reports a region mismatch.
const REGION = 'us-central1';

// Gmail account that sends the notification (to itself, the salon owner's inbox).
const GMAIL_USER = 'abdulwahababdullahi3619@gmail.com';
const NOTIFY_TO = 'abdulwahababdullahi3619@gmail.com';
// A Gmail App Password (not the account password), stored in Secret Manager.
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');

export const notifyNewBooking = onDocumentCreated(
  {
    document: 'appointments/{appointmentId}',
    database: DATABASE_ID,
    region: REGION,
    secrets: [GMAIL_APP_PASSWORD],
    retry: true, // transient email failures are retried instead of silently dropped
  },
  async (event) => {
    const booking = event.data?.data();
    const appointmentId = event.params.appointmentId;
    if (!booking) {
      logger.warn('Booking notification skipped: document has no data', { appointmentId });
      return;
    }

    const message = buildBookingEmail(booking, appointmentId);
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.value() },
    });

    const info = await transport.sendMail({
      from: `"Lamasat Al Joud bookings" <${GMAIL_USER}>`,
      to: NOTIFY_TO,
      ...message,
    });
    logger.info('Booking notification sent', { appointmentId, messageId: info.messageId });
  }
);
