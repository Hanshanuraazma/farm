# 🚀 PANDUAN DEPLOYMENT GOFARM KE VERCEL - STEP BY STEP

**Siap untuk deployment? Follow langkah-langkah ini dengan seksama!**

---

## 📌 QUICK SUMMARY

```
Total waktu: ~2 jam
Kesulitan: Easy (copy-paste credentials)
Biaya: FREE (semua services punya free tier)
Hasil: Live production app di vercel.app domain
```

---

## PHASE 1: SETUP SERVICES (90 menit)

Kerjakan langkah-langkah ini **SECARA PARALEL** untuk lebih cepat. Buka tab browser terpisah untuk masing-masing service.

### ✅ STEP 1: Setup Firebase

**Duration:** 10 menit

1. **Buka** https://console.firebase.google.com
2. **Login** dengan akun Google Anda
3. **Click** "Tambah Project" atau "Create Project"
4. **Fill form:**
   - Project name: `gofarm-production`
   - Uncheck: "Enable Google Analytics" (opsional)
5. **Create Project** → tunggu 2-3 menit

**Setelah project siap:**

6. **Icon ⚙️** (Settings) di atas → **Project Settings**
7. **Tab "Service Accounts"**
8. **Click "Generate New Private Key"**
9. **Download** file JSON (simpan di tempat aman)
10. **Extract dari JSON:**
    - Cari `"client_email"` → copy
    - Cari `"private_key"` → copy (yang panjang, termasuk `-----BEGIN...` dan `-----END...`)

11. **Tab "General" scroll ke bawah** → **"Your apps"**
12. **Klik icon `</>`** (Create web app)
13. **Register app name:** `GoFarm Web`
14. **Copy semua 7 credentials di bawah**

**Save credentials di text file untuk nanti!**

---

### ✅ STEP 2: Setup Sanity CMS

**Duration:** 10 menit

1. **Buka** https://www.sanity.io/manage
2. **Sign up/Login**
3. **Click "Create new project"**
4. **Fill:**
   - Project name: `gofarm-production`
   - Data dataset: `production`
   - Template: `Clean (no demo data)`
5. **Create**

**Setelah project siap:**

6. **Click project name** untuk masuk
7. **Sidebar** → **API** section
8. **Copy Project ID** (format: `xxxxx-yyyy`)

9. **Tab "Tokens"** → **Add API token**
10. **Name:** `Production Write Token`
    **Permissions:** `Editor`
    **Generate & Copy**

11. **Add another token:**
    **Name:** `Production Read Token`
    **Permissions:** `Viewer`
    **Generate & Copy**

**Save semua credentials!**

---

### ✅ STEP 3: Setup Stripe

**Duration:** 10 menit

1. **Buka** https://stripe.com
2. **Sign up** atau **Sign in**
3. **Dashboard** → kanan atas ada **toggle "Test mode"**
4. **Ensure ON** (switch ke test mode)
5. **Sidebar** → **Developers** → **API keys**
6. **Copy:**
   - Publishable key (pk_test_...)
   - Secret key (sk_test_...)

**Jangan worry tentang webhook dulu, setup nanti setelah deploy**

**Save credentials!**

---

### ✅ STEP 4: Setup Gmail App Password

**Duration:** 5 menit

1. **Buka** https://myaccount.google.com
2. **Left sidebar** → **Security**
3. **Scroll ke "Your devices"** → **2-Step Verification**
4. **Click "Get started"** (if not enabled)
5. **Follow instructions** untuk setup 2-step verification

**Setelah 2-Step Verification aktif:**

6. **Back to Security**
7. **Scroll ke "App passwords"** (muncul setelah 2SV aktif)
8. **Select:** 
   - App: **Mail**
   - Device: **Other (custom name)** → type "GoFarm"
9. **Generate**
10. **Copy** 16-character password (remove spaces)

**Save credentials!**

---

## PHASE 2: PERSIAPAN VERCEL (15 menit)

Punya semua credentials? Baik!

### 📝 Siapkan Environment Variables

Buat file text baru, paste dan isi template ini:

```bash
# ============================================================================
# COPY-PASTE template ini dan isi dengan credentials dari PHASE 1
# ============================================================================

# ---- App ----
NEXT_PUBLIC_BASE_URL=https://gofarm-XXXXX.vercel.app
NODE_ENV=production

# ---- Firebase Client (dari Step 1) ----
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... [dari credentials]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gofarm-production.firebaseapp.com [dari credentials]
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gofarm-production-xxxxx [dari credentials]
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gofarm-production.appspot.com [dari credentials]
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012 [dari credentials]
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefxxxx [dari credentials]
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX [dari credentials]

# ---- Firebase Admin (dari Step 1 - JSON file) ----
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@gofarm-production.iam.gserviceaccount.com [dari JSON]
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkq...[FULL KEY]...\n-----END PRIVATE KEY-----\n" [dari JSON - ONE LINE]

# ---- Admin Access (PENTING!) ----
ADMIN_EMAILS=your-email@gmail.com [email Anda untuk admin access]

# ---- Sanity CMS (dari Step 2) ----
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx-yyyy [Project ID]
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-09
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX [Write Token]
SANITY_API_READ_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX [Read Token]

# ---- Stripe (dari Step 3 - TEST MODE) ----
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX [Secret Key]
STRIPE_WEBHOOK_SECRET=whsec_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX [setup nanti]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX [Publishable Key]

# ---- Email (dari Step 4) ----
GMAIL_APP_PASSWORD=abcdefghijklmnop [16-char password, no spaces]
SENDER_EMAIL_ADDRESS=your-email@gmail.com [Gmail Anda]

# ---- Sanity Config ----
APP_ALLOWED_ORIGINS=
NEXT_PUBLIC_PAID_VERSION=https://gofarm.example.com
NEXT_PUBLIC_PURCHASE_CODE_URL=https://buymeacoffee.com/reactbd/e/484104

# ---- Company Info (customizable) ----
NEXT_PUBLIC_COMPANY_NAME=GoFarm
NEXT_PUBLIC_COMPANY_EMAIL=support@gofarm.com
NEXT_PUBLIC_COMPANY_PHONE=+62-xxx-xxx-xxxx
```

**Simpan file ini sebagai reference!**

---

## PHASE 3: VERCEL DEPLOYMENT (30 menit)

### 📱 Step 1: Login ke Vercel

1. **Buka** https://vercel.com
2. **Sign up** dengan GitHub (use your GitHub account)
3. **Authorize Vercel** untuk akses GitHub

### 🚀 Step 2: Import Project

1. **Dashboard** → **Add New** → **Project**
2. **Select repository:** `Hanshanuraazma/farm`
3. **Click Import**

### ⚙️ Step 3: Configure Project

**Framework Preset:** Next.js (should auto-detect) ✅

**Build Command:** `npm run build` (default) ✅

**Output Directory:** `.next` (default) ✅

**Root Directory:** `./` (default) ✅

### 📝 Step 4: Add Environment Variables

**CRITICAL STEP** - jangan skip!

1. **Expand "Environment Variables"** section
2. **Copy-paste SEMUA variables** dari template di atas
3. **Isi dengan credentials yang Anda kumpulkan**
4. **DOUBLE-CHECK:**
   - [ ] Semua variable terisi
   - [ ] FIREBASE_PRIVATE_KEY dalam ONE LINE dengan `\n` literal
   - [ ] Tidak ada typo di variable names
   - [ ] ADMIN_EMAILS = email Anda
   - [ ] TEST MODE credentials untuk Stripe (sk_test_...)

### 🎯 Step 5: Deploy

1. **Click "Deploy"** button (besar di bawah)
2. **Tunggu 3-5 menit** untuk build
3. **Status berubah jadi "Ready"** ✅
4. **Copy Deployment URL** (gofarm-abc123.vercel.app)

---

## PHASE 4: POST-DEPLOYMENT (20 menit)

### ✅ Update Base URL

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. **Update `NEXT_PUBLIC_BASE_URL`:**
   ```
   https://gofarm-abc123.vercel.app
   ```
   (replace abc123 dengan actual deployment URL)
3. **Auto-redeploy** (atau click **Redeploy**)

### ✅ Firebase: Add Authorized Domains

1. **Firebase Console** → **Authentication** → **Settings**
2. **Scroll ke "Authorized domains"**
3. **Add domain:**
   ```
   gofarm-abc123.vercel.app
   ```

### ✅ Sanity: Update CORS Origins

1. **Sanity Management** → Your project → **API** → **CORS Origins**
2. **Add:**
   ```
   https://gofarm-abc123.vercel.app
   ```

### ✅ Stripe: Setup Webhook (Later)

**Setup setelah verify akses admin working**

1. **Stripe Dashboard** → **Developers** → **Webhooks**
2. **Add endpoint:**
   ```
   https://gofarm-abc123.vercel.app/api/webhook
   ```
3. **Select events:** `checkout.session.completed`, `payment_intent.succeeded`
4. **Copy webhook secret** → update di Vercel env vars

---

## PHASE 5: VERIFICATION (10 menit)

### ✅ Test Admin Access

1. **Open** `https://gofarm-abc123.vercel.app`
2. **Click "Sign Up"**
3. **Use email dari ADMIN_EMAILS**
4. **Verify email** (check spam folder)
5. **Sign in**
6. **Navigate to `/admin`**
7. **If allowed** → Admin dashboard loads ✅
8. **If redirected to `/admin/access-denied`** → Something wrong, debug

### ✅ Test Product Browsing

1. **Homepage loads** ✅
2. **Click product** → detail page loads ✅
3. **Add to cart** ✅

### ✅ Test Payment (Using Test Card)

1. **Proceed to checkout**
2. **Fill test address**
3. **Use test card:** `4242 4242 4242 4242`
   - **Expiry:** 12/25
   - **CVC:** 123
4. **Click Pay**
5. **If payment shows "success"** ✅

---

## 🆘 TROUBLESHOOTING

### Build Failed
```
ERROR: Module not found

FIX: Vercel will auto-retry. Check logs if persists.
```

### Admin Access Denied
```
ERROR: Redirected to /admin/access-denied

FIX:
1. Verify ADMIN_EMAILS matches your sign-in email (case sensitive!)
2. Clear cookies & try again
3. Check Vercel logs for errors
```

### Firebase Error
```
ERROR: "Configuration not found"

FIX:
1. Verify all NEXT_PUBLIC_FIREBASE_* variables set
2. Check Firebase project ID matches
3. Ensure service account credentials correct
```

### Payment Not Working
```
ERROR: Payment button not responsive

FIX:
1. Verify STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY set
2. Check browser console for errors
3. Verify using TEST MODE keys (sk_test_...)
```

---

## ✅ DEPLOYMENT SUCCESS CHECKLIST

```
PRE-DEPLOYMENT:
□ All credentials collected from Phase 1
□ Repository pushed to GitHub
□ Ready to deploy

DURING DEPLOYMENT:
□ Vercel project imported
□ All env vars added correctly
□ Build completed successfully
□ Deployment URL obtained

POST-DEPLOYMENT:
□ Base URL updated
□ Firebase domains updated
□ Sanity CORS updated
□ Admin access tested
□ Products browsing tested
□ Payment tested with test card

FINAL:
□ Production URL shared
□ Stakeholders notified
□ Monitoring setup
□ Ready for users! 🎉
```

---

## 🎯 IMPORTANT NOTES

⚠️ **PRODUCTION TIPS:**

1. **Use TEST MODE** dulu (sk_test_..., pk_test_...)
2. **After testing:** Switch ke LIVE mode saat siap (sk_live_...)
3. **ADMIN_EMAILS:** Must match email yang login
4. **FIREBASE_PRIVATE_KEY:** Must be ONE LINE with literal `\n`
5. **Backup credentials** di password manager

---

## 📞 QUICK HELP

| Issue | Fix |
|-------|-----|
| Vercel build fails | Check logs, ensure Node version compatible |
| Admin access denied | Verify ADMIN_EMAILS email match |
| Firebase errors | Check all NEXT_PUBLIC_FIREBASE_* vars |
| Payment not working | Use test card 4242 4242 4242 4242 |
| Sanity not loading | Check SANITY_API_TOKEN valid |
| Email not sending | Verify Gmail app password 16-char, no spaces |

---

**Good luck with deployment! You got this! 🚀**

Jika ada yang unclear, refer ke DEPLOYMENT.md untuk detail lebih lanjut.
