# Booking notifications

`notifyNewBooking` runs whenever a document is created in `appointments/` (the site's Firestore database)
and emails the booking details to abdulwahababdullahi3619@gmail.com. It sends through that same Gmail
account using an App Password, so no third-party email service is needed.

## One-time setup

1. **Blaze plan.** Cloud Functions require the Firebase project `supple-climate-zcf5x` to be on the Blaze
   (pay-as-you-go) plan. A salon's booking volume stays well inside the free monthly allowance.
2. **Gmail App Password.** In the Google account abdulwahababdullahi3619@gmail.com: turn on 2-Step
   Verification, then create an App Password (Google Account > Security > App passwords).
3. **Deploy** (from the repository root):

   ```bash
   npm install -g firebase-tools
   firebase login
   cd functions && npm install && cd ..
   firebase functions:secrets:set GMAIL_APP_PASSWORD   # paste the App Password when prompted
   firebase deploy --only functions
   ```

   If the deploy reports that the function region does not match the database location, set `REGION` in
   `functions/index.js` to the database's location (Firebase console > Firestore > the database) and deploy
   again.

## Checking it works

- Make a test booking on the live site; the email arrives within a minute.
- Logs: `firebase functions:log --only notifyNewBooking` (look for "Booking notification sent"), or
  Google Cloud console > Cloud Run functions > notifyNewBooking > Logs.
- Failed sends are retried automatically and show up as errors in the same logs.

## Tests

```bash
cd functions && npm test
```
