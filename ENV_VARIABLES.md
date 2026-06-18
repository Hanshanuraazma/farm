# 🔐 Environment Variables - Quick Reference

Template lengkap semua environment variables yang diperlukan untuk GoFarm.

---

## 📋 Complete Environment Variables Template

Copy template ini dan isi dengan credentials Anda:

```bash
# ============================================================================
# GoFarm - Production Environment Variables
# Copy file ini dan rename ke .env.local untuk development
# Atau paste ke Vercel Dashboard untuk production
# ============================================================================

# ---- Application ----
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
NODE_ENV=production

# ---- Firebase Client Configuration (Public - Safe to expose) ----
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy_YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID

# ---- Firebase Admin (Server-side - KEEP SECRET!) ----
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkq...[your-key-here]...\n-----END PRIVATE KEY-----\n"

# ---- Admin Access ----
# Email(s) yang akan memiliki akses admin panel
# Multiple emails: comma-separated
ADMIN_EMAILS=admin@example.com,admin2@example.com

# ---- Sanity CMS ----
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-09
SANITY_API_TOKEN=sk_YOUR_WRITE_TOKEN_HERE
SANITY_API_READ_TOKEN=sk_YOUR_READ_TOKEN_HERE

# ---- Stripe Payment Gateway ----
STRIPE_SECRET_KEY=sk_live_YOUR_STRIPE_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# ---- Email Service (Gmail SMTP) ----
GMAIL_APP_PASSWORD=abcdefghijklmnop
SENDER_EMAIL_ADDRESS=noreply@yourdomain.com

# ---- Optional: Google Maps API ----
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy_YOUR_MAPS_API_KEY_HERE

# ---- Optional: SSLCommerz (Bangladesh Payment Gateway) ----
SSLCOMMERZ_STORE_ID=your-store-id
SSLCOMMERZ_STORE_PASSWORD=your-store-password
SSLCOMMERZ_IS_LIVE=false

# ---- Optional: Google Analytics 4 ----
GA4_MEASUREMENT_ID=G-YOUR_GA4_ID
GA4_API_SECRET=YOUR_API_SECRET_HERE

# ---- Optional: Tax & Loyalty Points Configuration ----
TAX_AMOUNT=0.00
REWARD_POINTS_THRESHOLD=3000
REWARD_POINTS_AMOUNT=5
LOYALTY_POINTS_ORDER_THRESHOLD=5
LOYALTY_POINTS_AMOUNT=100

# ---- Company Information (Public) ----
NEXT_PUBLIC_COMPANY_NAME=GoFarm
NEXT_PUBLIC_COMPANY_EMAIL=support@gofarm.com
NEXT_PUBLIC_COMPANY_PHONE=+62-xxx-xxx-xxxx
NEXT_PUBLIC_COMPANY_ADDRESS=Jl. Contoh No. 123, Jakarta
NEXT_PUBLIC_COMPANY_CITY=Jakarta
NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKDAY=09:00 - 17:00 WIB
NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKEND=10:00 - 15:00 WIB
NEXT_PUBLIC_SUPPORT_EMAIL=support@gofarm.com
NEXT_PUBLIC_SALES_EMAIL=sales@gofarm.com
NEXT_PUBLIC_CONTACT_RESPONSE_TIME=24 hours
NEXT_PUBLIC_QUICK_RESPONSE_TIME=1 hour
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/gofarm
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/gofarm
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/gofarm
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/gofarm
NEXT_PUBLIC_COMPANY_DESCRIPTION=Fresh organic farm products delivered to your doorstep
NEXT_PUBLIC_COPYRIGHT_TEXT=© 2024 GoFarm. All rights reserved.
NEXT_PUBLIC_PRIVACY_POLICY_URL=/privacy
NEXT_PUBLIC_TERMS_URL=/terms

# ---- Optional: Premium Features ----
NEXT_PUBLIC_PAID_VERSION=https://buymeacoffee.com/reactbd/e/484104
NEXT_PUBLIC_PURCHASE_CODE_URL=https://buymeacoffee.com/reactbd/e/484104
```

---

## 🔍 Variable Descriptions

### **Required Variables** (Wajib)

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_BASE_URL` | URL aplikasi production | Vercel deployment URL |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase client config | Firebase Console → Project Settings |
| `FIREBASE_CLIENT_EMAIL` | Firebase admin service account | Firebase Console → Service Accounts |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | Download service account JSON |
| `ADMIN_EMAILS` | Email(s) admin panel access | Your email address |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Sanity Management Dashboard |
| `SANITY_API_TOKEN` | Sanity write token | Sanity → API → Tokens |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe Dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Stripe → Webhooks |
| `GMAIL_APP_PASSWORD` | Gmail app password | Google Account → App Passwords |
| `SENDER_EMAIL_ADDRESS` | Email sender address | Your Gmail address |

### **Optional Variables** (Opsional)

| Variable | Description | Impact if Not Set |
|----------|-------------|-------------------|
| `SANITY_API_READ_TOKEN` | Sanity read-only token | Uses write token for reads |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | Stripe checkout won't work |
| `SSLCOMMERZ_*` | Bangladesh payment gateway | SSLCommerz payments disabled |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps for address | No map in address picker |
| `GA4_*` | Google Analytics | No analytics tracking |
| `NEXT_PUBLIC_COMPANY_*` | Company info displayed | Uses default/empty values |

---

## ⚠️ Important Notes

### 1. Firebase Private Key Format

**CORRECT** ✅:
```bash
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkq...\n-----END PRIVATE KEY-----\n"
```

**WRONG** ❌:
```bash
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkq...
-----END PRIVATE KEY-----
```

The key must be:
- Wrapped in **double quotes**
- All in **one line**
- Use **literal `\n`** for newlines (not actual newlines)

### 2. Admin Emails

- **Case sensitive**: `admin@gmail.com` ≠ `Admin@gmail.com`
- **No spaces**: `admin@gmail.com,admin2@gmail.com` (correct)
- **Must match sign-in email exactly**

### 3. Vercel Environment Variables

When adding to Vercel:
- Go to: **Project Settings** → **Environment Variables**
- Add each variable **one by one** or **upload .env file**
- Select environment: **Production**, **Preview**, **Development**
- Redeploy after adding variables

### 4. Security

**NEVER**:
- ❌ Commit `.env` files to git
- ❌ Share private keys in public
- ❌ Use production keys in development
- ❌ Store secrets in code

**ALWAYS**:
- ✅ Use `.env.local` for local development
- ✅ Keep `.env.example` updated (without real values)
- ✅ Use different credentials for staging/production
- ✅ Rotate secrets periodically

---

## 🧪 Testing Environment Variables

### Local Testing

```bash
# 1. Copy .env.example to .env.local
cp .env.example .env.local

# 2. Fill in your credentials
# Edit .env.local dengan editor favorit

# 3. Test
npm run dev
```

### Verify Variables Loaded

Tambah di component untuk debug (remove setelah testing):

```typescript
// components/DebugEnv.tsx
export default function DebugEnv() {
  console.log({
    firebase: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    sanity: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    stripe: !!process.env.STRIPE_SECRET_KEY,
  });
  return null;
}
```

Check browser console untuk verify variables loaded.

---

## 🔄 Updating Environment Variables

### On Vercel

1. Go to Vercel Dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Edit/Add/Remove variables
5. **Redeploy** (automatic or manual)

### Trigger Redeploy

```bash
# Via CLI
vercel --prod

# Or via Dashboard
# Deployments → ... → Redeploy
```

---

## 📝 Environment Variable Checklist

Before deployment, verify:

- [ ] All **NEXT_PUBLIC_FIREBASE_*** variables set
- [ ] **FIREBASE_CLIENT_EMAIL** set (server)
- [ ] **FIREBASE_PRIVATE_KEY** set and formatted correctly
- [ ] **ADMIN_EMAILS** set with your email
- [ ] **NEXT_PUBLIC_SANITY_PROJECT_ID** set
- [ ] **SANITY_API_TOKEN** set (Editor permission)
- [ ] **STRIPE_SECRET_KEY** set (live or test)
- [ ] **STRIPE_WEBHOOK_SECRET** set
- [ ] **GMAIL_APP_PASSWORD** set (16 chars, no spaces)
- [ ] **SENDER_EMAIL_ADDRESS** set
- [ ] **NEXT_PUBLIC_BASE_URL** updated to production URL
- [ ] No syntax errors (missing quotes, newlines, etc.)
- [ ] All secrets kept private
- [ ] `.env` files in `.gitignore`

---

## 🆘 Troubleshooting

### "Environment variable not found"

**Cause**: Variable not set or typo in name

**Fix**:
1. Check spelling matches exactly
2. Check if added in Vercel
3. Redeploy after adding
4. Check environment (Production/Preview/Development)

### "Firebase private key invalid"

**Cause**: Incorrect format

**Fix**:
1. Ensure quotes around entire value
2. Use `\n` not actual newlines
3. Copy from downloaded JSON carefully
4. No extra spaces or characters

### "Admin access denied"

**Cause**: Email mismatch or not loaded

**Fix**:
1. Verify email in `ADMIN_EMAILS` exact match
2. Check case sensitivity
3. Clear cookies and sign in again
4. Check Vercel logs for loaded env vars

### "Stripe webhook failed"

**Cause**: Wrong webhook secret or URL

**Fix**:
1. Verify webhook URL in Stripe matches deployment
2. Check `STRIPE_WEBHOOK_SECRET` matches
3. Check webhook is active in Stripe
4. Test with Stripe CLI

---

**Ready to deploy? Copy this template, fill it in, and let's go! 🚀**
