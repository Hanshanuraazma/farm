# 🚀 GoFarm - Panduan Deployment ke Vercel

Dokumentasi lengkap untuk deployment aplikasi GoFarm e-commerce ke Vercel.

---

## 📋 Prerequisites

Sebelum memulai deployment, pastikan Anda memiliki:

- ✅ Akun GitHub (repository sudah di-push)
- ✅ Akun Vercel (gratis di [vercel.com](https://vercel.com))
- ✅ Akun Firebase ([console.firebase.google.com](https://console.firebase.google.com))
- ✅ Akun Sanity ([sanity.io](https://www.sanity.io))
- ✅ Akun Stripe ([stripe.com](https://stripe.com))
- ✅ Akun Gmail untuk email notifications

---

## 🔧 LANGKAH 1: Setup Firebase

### 1.1 Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik **"Add Project"** atau **"Tambah Project"**
3. Nama project: **"gofarm-production"** (atau nama lain)
4. Disable Google Analytics (optional)
5. Klik **"Create Project"**

### 1.2 Enable Authentication

1. Di Firebase Console, pilih project Anda
2. Sidebar kiri → **"Authentication"**
3. Klik **"Get Started"**
4. Tab **"Sign-in method"**
5. Enable providers yang diinginkan:
   - ✅ **Email/Password** (wajib)
   - ✅ **Google** (recommended)
   - ✅ **GitHub** (optional)

### 1.3 Get Firebase Web Credentials

1. Sidebar kiri → **"Project Settings"** (ikon gear)
2. Tab **"General"** scroll ke bawah
3. Section **"Your apps"** → klik icon **"</>"** (Web)
4. Register app dengan nickname: **"GoFarm Web"**
5. Copy semua credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gofarm-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gofarm-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gofarm-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:xxxxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 1.4 Create Service Account (Server-side)

1. Sidebar kiri → **"Project Settings"**
2. Tab **"Service Accounts"**
3. Klik **"Generate New Private Key"**
4. Download file JSON
5. Buka file JSON, copy values:

```bash
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@gofarm-xxx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"
```

⚠️ **PENTING**: Untuk `FIREBASE_PRIVATE_KEY`, format harus satu baris dengan `\n` literal:
```bash
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkq...\n-----END PRIVATE KEY-----\n"
```

### 1.5 Configure Authorized Domains

1. Sidebar kiri → **"Authentication"**
2. Tab **"Settings"**
3. Scroll ke **"Authorized domains"**
4. Tambahkan domain Vercel Anda nanti (setelah deploy):
   - `your-project.vercel.app`
   - Custom domain jika ada

---

## 🎨 LANGKAH 2: Setup Sanity CMS

### 2.1 Buat Sanity Project

```bash
# Di terminal project Anda
npm create sanity@latest
```

Follow prompts:
- **Create new project**: Yes
- **Project name**: gofarm-production
- **Dataset**: production
- **Project template**: Clean project with no predefined schemas

Atau buat manual di dashboard:
1. Buka [Sanity Management](https://www.sanity.io/manage)
2. Klik **"Create new project"**
3. Nama: **gofarm-production**

### 2.2 Get Project ID

1. Di [Sanity Management](https://www.sanity.io/manage)
2. Pilih project Anda
3. Copy **Project ID**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-09
```

### 2.3 Create API Tokens

1. Di Sanity Management → project Anda
2. Klik tab **"API"**
3. Section **"Tokens"** → klik **"Add API token"**

**Create 2 tokens**:

**Token 1 - Write Access (Editor)**:
- Name: `Production Write Token`
- Permissions: **Editor**
- Copy token:
```bash
SANITY_API_TOKEN=skxxxxxxxxxxxxxxxxxxxxx
```

**Token 2 - Read Access (Viewer)** - Optional:
- Name: `Production Read Token`
- Permissions: **Viewer**
- Copy token:
```bash
SANITY_API_READ_TOKEN=skxxxxxxxxxxxxxxxxxxxxx
```

### 2.4 Configure CORS Origins

1. Tab **"API"** → section **"CORS Origins"**
2. Klik **"Add CORS origin"**
3. Tambahkan:
   - `http://localhost:3000` (development)
   - `https://your-project.vercel.app` (production - tambah setelah deploy)
   - Custom domain jika ada
4. Allow credentials: **Yes**

### 2.5 Deploy Sanity Studio (Optional)

Jika ingin akses Sanity Studio di `/studio`:
```bash
npm run build
# Studio akan accessible di https://your-domain.com/studio
```

---

## 💳 LANGKAH 3: Setup Stripe Payment

### 3.1 Create Stripe Account

1. Buka [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up / Login
3. Activate account (perlu verifikasi bisnis untuk production)

### 3.2 Get API Keys

**Test Mode** (untuk testing):
1. Toggle ke **"Test mode"** (kanan atas)
2. Sidebar → **"Developers"** → **"API keys"**
3. Copy keys:

```bash
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

**Live Mode** (untuk production):
1. Toggle ke **"Live mode"**
2. Same steps, tapi gunakan Live keys

### 3.3 Setup Webhook

Webhooks untuk payment events (order confirmation, payment success, dll).

**For Production**:
1. Sidebar → **"Developers"** → **"Webhooks"**
2. Klik **"Add endpoint"**
3. Endpoint URL: `https://your-domain.vercel.app/api/webhook`
4. Events to send:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.succeeded`
   - ✅ `charge.failed`
5. Copy **Signing secret**:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

**For Local Development** (optional):
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhook
# Copy webhook signing secret dari output
```

---

## 📧 LANGKAH 4: Setup Gmail SMTP

Untuk email notifications (order confirmation, password reset, dll).

### 4.1 Enable 2-Step Verification

1. Buka [Google Account](https://myaccount.google.com)
2. **Security** → **2-Step Verification**
3. Follow prompts untuk enable

### 4.2 Create App Password

1. Setelah 2-Step Verification aktif
2. **Security** → **App passwords**
3. Select app: **Mail**
4. Select device: **Other** (Custom name: "GoFarm Production")
5. Generate → Copy 16-character password

```bash
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
SENDER_EMAIL_ADDRESS=your-email@gmail.com
```

⚠️ Remove spaces dari app password:
```bash
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

---

## 🔐 LANGKAH 5: Configure Admin Access

Set email admin yang akan memiliki akses penuh ke admin panel:

```bash
# Single admin
ADMIN_EMAILS=admin@example.com

# Multiple admins (comma separated)
ADMIN_EMAILS=admin@example.com,admin2@example.com,you@example.com
```

⚠️ **PENTING**: Gunakan email yang sama dengan yang Anda gunakan untuk sign in!

---

## 📝 LANGKAH 6: Complete Environment Variables

Buat file `.env.local` untuk testing lokal atau siapkan untuk Vercel:

```bash
# ============================================================================
# GoFarm Production Environment Variables
# ============================================================================

# ---- Base Configuration ----
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
NODE_ENV=production

# ---- Firebase Client (Public) ----
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# ---- Firebase Admin (Server - Secret!) ----
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# ---- Admin Access ----
ADMIN_EMAILS=your-email@example.com

# ---- Sanity CMS ----
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-09
SANITY_API_TOKEN=
SANITY_API_READ_TOKEN=

# ---- Stripe Payment ----
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# ---- Email Service ----
GMAIL_APP_PASSWORD=
SENDER_EMAIL_ADDRESS=

# ---- Optional: Google Maps (untuk location picker) ----
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# ---- Optional: SSLCommerz (Payment Gateway Bangladesh) ----
SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=
SSLCOMMERZ_IS_LIVE=false

# ---- Optional: Analytics ----
GA4_MEASUREMENT_ID=
GA4_API_SECRET=

# ---- Company Info (Public) ----
NEXT_PUBLIC_COMPANY_NAME=GoFarm
NEXT_PUBLIC_COMPANY_EMAIL=support@gofarm.com
NEXT_PUBLIC_COMPANY_PHONE=+62-xxx-xxx-xxxx
```

---

## 🚀 LANGKAH 7: Deploy ke Vercel

### 7.1 Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Sign in dengan GitHub

2. **Import Project**
   - Klik **"Add New..."** → **"Project"**
   - Select repository: **"Hanshanuraazma/farm"**
   - Klik **"Import"**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected) ✅
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   - Expand **"Environment Variables"**
   - Copy-paste SEMUA variables dari `.env.local` atau list di atas
   - Atau upload file `.env` (recommended)

5. **Deploy**
   - Klik **"Deploy"**
   - Wait 3-5 minutes
   - 🎉 Done!

### 7.2 Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: gofarm
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### 7.3 Update Base URL

Setelah deploy pertama:
1. Copy deployment URL (e.g., `gofarm-abc123.vercel.app`)
2. Update environment variable:
   ```bash
   NEXT_PUBLIC_BASE_URL=https://gofarm-abc123.vercel.app
   ```
3. Redeploy (Vercel akan auto-redeploy saat env var berubah)

---

## 🔄 LANGKAH 8: Post-Deployment Configuration

### 8.1 Update Firebase Authorized Domains

1. Firebase Console → **Authentication** → **Settings**
2. **Authorized domains** → Add:
   - `gofarm-abc123.vercel.app`
   - Custom domain (jika ada)

### 8.2 Update Sanity CORS

1. Sanity Management → **API** → **CORS Origins**
2. Add:
   - `https://gofarm-abc123.vercel.app`
   - Custom domain (jika ada)

### 8.3 Update Stripe Webhook

1. Stripe Dashboard → **Developers** → **Webhooks**
2. Edit webhook endpoint:
   - URL: `https://gofarm-abc123.vercel.app/api/webhook`
3. Test webhook (send test event)

### 8.4 Test Admin Access

1. Buka `https://gofarm-abc123.vercel.app`
2. Sign in dengan email yang ada di `ADMIN_EMAILS`
3. Navigate ke `/admin`
4. Verify access granted ✅

---

## ✅ Deployment Checklist

Gunakan checklist ini untuk memastikan semua sudah setup:

### Firebase
- [ ] Project created
- [ ] Authentication enabled (Email/Password, Google)
- [ ] Web app registered & credentials copied
- [ ] Service account created & private key downloaded
- [ ] Authorized domains configured

### Sanity
- [ ] Project created
- [ ] Project ID copied
- [ ] API tokens created (Editor & Viewer)
- [ ] CORS origins configured
- [ ] Schemas deployed

### Stripe
- [ ] Account created & activated
- [ ] API keys copied (test & live)
- [ ] Webhook endpoint created
- [ ] Webhook secret copied
- [ ] Test payment success

### Email
- [ ] Gmail 2-Step Verification enabled
- [ ] App password generated
- [ ] Sender email configured
- [ ] Test email sent

### Vercel
- [ ] Project imported from GitHub
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active

### Post-Deployment
- [ ] Firebase authorized domains updated
- [ ] Sanity CORS updated
- [ ] Stripe webhook updated
- [ ] Admin access tested
- [ ] Sign up/Sign in tested
- [ ] Product browsing tested
- [ ] Add to cart tested
- [ ] Checkout tested
- [ ] Payment tested
- [ ] Email notifications tested

---

## 🐛 Troubleshooting

### Build Errors

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Error: "Firebase admin requires private key"**
- Pastikan `FIREBASE_PRIVATE_KEY` dalam format string dengan `\n` literal
- Jangan lupa quotes di awal dan akhir

**Error: "Sanity client not authorized"**
- Check `SANITY_API_TOKEN` valid
- Check CORS origins di Sanity includes production URL

### Runtime Errors

**Admin access denied**
- Verify email di `ADMIN_EMAILS` match dengan email sign in
- Check capitalization (case sensitive)
- Clear browser cache & cookies
- Sign out dan sign in lagi

**Payment failed**
- Check Stripe webhook URL correct
- Check webhook secret valid
- Check Stripe API keys (test vs live)
- Check logs di Stripe Dashboard

**Email not sending**
- Verify Gmail app password (16 characters, no spaces)
- Check sender email address
- Check Gmail account not locked
- Check Vercel function logs

### Performance Issues

**Slow page loads**
- Enable Vercel Analytics
- Check Sanity query performance
- Optimize images (use Next.js Image)
- Enable caching

---

## 🔒 Security Best Practices

1. **Never commit .env files**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Rotate secrets periodically**
   - Firebase service account keys
   - Sanity API tokens
   - Stripe API keys
   - Gmail app password

3. **Use separate environments**
   - Development: test credentials
   - Staging: test credentials
   - Production: live credentials

4. **Monitor logs**
   - Vercel function logs
   - Stripe webhook logs
   - Firebase authentication logs

5. **Set up alerts**
   - Payment failures
   - Authentication errors
   - API rate limits
   - Unusual traffic

---

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Vercel Dashboard → Project → **Analytics**
2. Enable **Web Analytics** (free)
3. Enable **Speed Insights** (free)

### Firebase Analytics
1. Firebase Console → **Analytics**
2. Enable Google Analytics integration
3. View user behavior & conversion funnels

### Stripe Dashboard
1. View transactions
2. Monitor webhook deliveries
3. Check for failed payments
4. Generate reports

---

## 🎯 Next Steps

Setelah deployment berhasil:

1. **Test thoroughly** semua fitur
2. **Set up monitoring** dan alerts
3. **Configure custom domain** (optional)
4. **Enable SSL** (Vercel auto-enables)
5. **Set up CI/CD** untuk auto-deploy on push
6. **Create staging environment** untuk testing
7. **Document** API endpoints
8. **Train** admin users
9. **Launch** 🚀

---

## 📞 Support

Jika mengalami masalah:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Check [Sanity Documentation](https://www.sanity.io/docs)
- Check [Stripe Documentation](https://stripe.com/docs)

---

**Good luck with your deployment! 🚀**
