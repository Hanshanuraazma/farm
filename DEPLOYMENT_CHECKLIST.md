# ✅ GoFarm Deployment Checklist

Quick checklist untuk memastikan deployment berhasil.

---

## 🚀 PRE-DEPLOYMENT

### 1. Code & Repository
- [ ] All changes committed to git
- [ ] Code pushed to GitHub (`Hanshanuraazma/farm`)
- [ ] `.env` files in `.gitignore`
- [ ] No sensitive data in code
- [ ] `vercel.json` configured

### 2. Local Build Test
```bash
npm install
npm run build
npm start
```
- [ ] Build successful (no errors)
- [ ] App runs on http://localhost:3000
- [ ] All pages load correctly
- [ ] No console errors

---

## 🔧 SERVICE SETUP

### Firebase ✅
- [ ] Project created: `gofarm-production`
- [ ] Authentication enabled (Email + Google)
- [ ] Web app registered
- [ ] Service account JSON downloaded
- [ ] Credentials copied to env vars:
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `FIREBASE_CLIENT_EMAIL`
  - [ ] `FIREBASE_PRIVATE_KEY` (one line, with \n)

### Sanity CMS ✅
- [ ] Project created: `gofarm-production`
- [ ] Project ID copied
- [ ] API tokens created:
  - [ ] Editor token for `SANITY_API_TOKEN`
  - [ ] Viewer token for `SANITY_API_READ_TOKEN` (optional)
- [ ] Credentials copied:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET=production`
  - [ ] `SANITY_API_TOKEN`

### Stripe Payment ✅
- [ ] Account created & verified
- [ ] API keys obtained:
  - [ ] `STRIPE_SECRET_KEY` (sk_live_ or sk_test_)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Webhook endpoint planned (will add after deploy)

### Email Service ✅
- [ ] Gmail 2-Step Verification enabled
- [ ] App password generated
- [ ] Credentials set:
  - [ ] `GMAIL_APP_PASSWORD` (16 chars, no spaces)
  - [ ] `SENDER_EMAIL_ADDRESS`

### Admin Access ✅
- [ ] Admin email(s) decided
- [ ] Set in: `ADMIN_EMAILS=your-email@example.com`

---

## 🌐 VERCEL DEPLOYMENT

### 1. Import Project
- [ ] Login to [vercel.com](https://vercel.com)
- [ ] Click "Add New..." → "Project"
- [ ] Import `Hanshanuraazma/farm`
- [ ] Framework detected: Next.js ✅

### 2. Configure Build
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `.next` (default)
- [ ] Install Command: `npm install` (default)
- [ ] Root Directory: `./` (default)

### 3. Environment Variables
- [ ] All variables added (copy from ENV_VARIABLES.md)
- [ ] No typos in variable names
- [ ] No extra spaces in values
- [ ] `FIREBASE_PRIVATE_KEY` formatted correctly
- [ ] Temporary `NEXT_PUBLIC_BASE_URL=http://localhost:3000` (will update)

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (~3-5 minutes)
- [ ] Build successful ✅
- [ ] Copy deployment URL (e.g., `gofarm-xyz123.vercel.app`)

---

## 🔄 POST-DEPLOYMENT

### 1. Update Base URL
- [ ] Go to Vercel → Project → Settings → Environment Variables
- [ ] Update `NEXT_PUBLIC_BASE_URL` to deployment URL
- [ ] Redeploy (automatic)

### 2. Firebase Configuration
- [ ] Go to Firebase Console → Authentication → Settings
- [ ] Add to Authorized Domains:
  - [ ] `gofarm-xyz123.vercel.app`
  - [ ] Custom domain (if any)

### 3. Sanity CMS Configuration
- [ ] Go to Sanity Management → Your Project → API → CORS Origins
- [ ] Add:
  - [ ] `https://gofarm-xyz123.vercel.app`
  - [ ] Custom domain (if any)
- [ ] Allow credentials: Yes

### 4. Stripe Webhook
- [ ] Go to Stripe Dashboard → Developers → Webhooks
- [ ] Click "Add endpoint"
- [ ] URL: `https://gofarm-xyz123.vercel.app/api/webhook`
- [ ] Select events:
  - [ ] `checkout.session.completed`
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
- [ ] Copy webhook signing secret
- [ ] Add to Vercel: `STRIPE_WEBHOOK_SECRET`
- [ ] Redeploy

---

## 🧪 TESTING

### Authentication ✅
- [ ] Visit deployed site
- [ ] Click "Sign Up"
- [ ] Create account with email
- [ ] Verify email received (if email verification enabled)
- [ ] Sign in successful
- [ ] User profile shows correctly

### Admin Access ✅
- [ ] Sign in with admin email (from `ADMIN_EMAILS`)
- [ ] Navigate to `/admin`
- [ ] Access granted (not redirected to access-denied)
- [ ] Admin dashboard loads
- [ ] Can view products, orders, users

### Products ✅
- [ ] Homepage loads
- [ ] Products display correctly
- [ ] Product images load
- [ ] Click product → detail page loads
- [ ] Product information displays

### Cart & Checkout ✅
- [ ] Add product to cart
- [ ] Cart icon shows count
- [ ] View cart page
- [ ] Update quantity
- [ ] Remove item
- [ ] Proceed to checkout

### Payment ✅
- [ ] Checkout page loads
- [ ] Fill shipping address
- [ ] Stripe payment form loads
- [ ] Test payment (use test card: 4242 4242 4242 4242)
- [ ] Payment successful
- [ ] Order confirmation page
- [ ] Order appears in "My Orders"
- [ ] Email notification received

### Email Notifications ✅
- [ ] Order confirmation email received
- [ ] Password reset email works (if implemented)
- [ ] Welcome email (if implemented)

---

## 🐛 COMMON ISSUES & FIXES

### Build Failed
**Error**: Module not found
```bash
# Fix: Clear dependencies
rm -rf node_modules .next
npm install
```

**Error**: Type errors
```bash
# Temporary fix (not recommended for production):
# Uncomment in next.config.ts:
# typescript: { ignoreBuildErrors: true }
```

### Runtime Errors

**Admin access denied**
- Verify email in `ADMIN_EMAILS` matches sign-in email
- Check case sensitivity
- Clear cookies, sign out, sign in again

**Firebase error: "auth/configuration-not-found"**
- Check all Firebase env vars set
- Check Firebase project active
- Check authorized domains includes Vercel URL

**Sanity images not loading**
- Check CORS origins in Sanity includes Vercel URL
- Check image URLs in console for errors

**Stripe payment fails**
- Check webhook endpoint URL correct
- Check webhook secret matches
- Check using correct API keys (test vs live)
- View logs in Stripe Dashboard

**Email not sending**
- Check Gmail app password (16 chars, no spaces)
- Check 2-Step Verification enabled
- Check sender email correct
- View Vercel function logs

---

## 📊 MONITORING

### Vercel Dashboard
- [ ] Enable Web Analytics
- [ ] Enable Speed Insights
- [ ] Check function logs for errors
- [ ] Monitor bandwidth usage

### Firebase Console
- [ ] Check Authentication logs
- [ ] Monitor active users
- [ ] Check for unusual activity

### Stripe Dashboard
- [ ] Monitor transactions
- [ ] Check webhook delivery success rate
- [ ] View failed payments

---

## 🎉 LAUNCH READY

All checkboxes checked? **You're ready to go live!** 🚀

### Final Steps:
1. [ ] Announce to team/stakeholders
2. [ ] Share production URL
3. [ ] Monitor for first 24 hours
4. [ ] Gather user feedback
5. [ ] Plan first update

---

## 📞 SUPPORT

Issues not resolved? Check:
- **DEPLOYMENT.md** - Full deployment guide
- **ENV_VARIABLES.md** - All env var details
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**Good luck! 🍀**
