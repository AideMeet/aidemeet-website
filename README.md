# AideMeet Landing Page

Modern, responsive landing page for AideMeet with waitlist functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
aidemeet-website/
├── public/
│   ├── logo.jpg          
│   └── favicon.ico       
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Main page
│   │   └── globals.css   # Global styles
│   └── components/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── HowItWorks.tsx
│       ├── Pricing.tsx
│       ├── FAQ.tsx
│       ├── Footer.tsx
│       └── WaitlistForm.tsx
├── .env.example          # Environment variables template
└── README.md
```


## 📝 Setup Waitlist (Google Sheets)

### Option 1: Google Sheets

**Step 1: Create Google Sheet**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet named "AideMeet Waitlist"
3. Add headers in Row 1: `Email` | `Role` | `Timestamp`

**Step 2: Create Apps Script**
1. In your sheet: `Extensions` → `Apps Script`
2. Delete default code and paste:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.email,
      data.role,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click `Deploy` → `New deployment`
4. Type: `Web app`
5. Execute as: `Me`
6. Who has access: `Anyone`
7. Click `Deploy`
8. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/.../exec`)

**Step 3: Add URL to Environment**
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Add your URL:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec
   ```

**Step 4: Test**
1. Restart dev server: `npm run dev`
2. Submit waitlist form
3. Check your Google Sheet - new row should appear!

---

### Option 2: Web3Forms (Email Notifications)

**Get API Key:**
1. Go to [Web3Forms](https://web3forms.com)
2. Enter your email
3. Verify email
4. Copy your Access Key

**Setup:**
1. Add to `.env.local`:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   ```
2. Uncomment Web3Forms code in `WaitlistForm.tsx` (lines marked with comment)

**Result:** Every signup sends you email
**Now:** Every signup sends email to hello@aidemeet.com

---


## 📞 Support

Questions? Email: victoria.ashford54@gmail.com or hello@aidemeet.com