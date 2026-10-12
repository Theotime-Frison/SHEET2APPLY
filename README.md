# 📩 Sheet2Apply

Sheet2Apply helps you organize and speed up your job search. It provides a Google Sheet template to track your applications and record key details (Title, Company, Status, Description, etc.).

In addition to tracking, Sheet2Apply automates the creation of customized application documents (Cover Letter, CV) directly in your Google Drive. Leveraging AI APIs and dedicated templates, it automatically adapts your documents to specific job offers and skills to generate a tailored first draft.

---

## ✨ Features

- **Automation**:
  - Google Maps API: Automatically retrieve the company address.
  - Clean and organize your Google Sheet database.
  - Automatically fill in metadata for new applications (Creation Date, Default Language, etc.).
- **Customized Documents**:
  - *CV*: Adapt title and introduction based on the job offer and your profile.
  - *Cover Letter*: Generate an automated first draft following custom AI instructions matching your style.
- **Dynamic Folder Organization**: Automatic structure by Year and Quarter in Google Drive.
- **Security**: Securely store your API keys using `PropertiesService`.
- **Multilingual Support**: Apply in English or French.

---

## 🛠️ Technologies

- **Language**: Google Apps Script (JavaScript ES6)
- **Google Services**: Google Sheets, Google Drive, Google Docs, Google Slides
- **APIs**: Gemini API, Google Maps API

---

## 📋 Prerequisites

Before starting, ensure you have:
- A Google account with access to **Google Drive** and **Google Sheets**.
- A **Gemini API Key**
- A **Google Maps API Key**

---

## ⚙️ Configuration & Installation

### Step 1: Get Your API Keys

***Gemini API Key***:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and sign in with your Google account.
2. Accept the terms of service if prompted.
3. Click **Create API key** (select or create a Google Cloud project).
4. Copy your generated key and keep it secure.

***Google Maps API Key***:
1. Log in to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **New Project** with a descriptive name.
3. Go to **APIs & Services > Library**, search for and enable the required APIs (*Geocoding API*, *Places API*).
4. Set up a billing account in the **Billing** section (required by Google to activate Map services).
5. Navigate to **APIs & Services > Credentials**, click **+ Create Credentials**, and select **API key**.
6. Copy your API key and configure restrictions if desired.

---

### Step 2: Copy the Template Files

Make a copy of each template to your own Google Drive (**File > Make a copy**):

- [Google Sheet Follow-up File](https://docs.google.com/spreadsheets/d/1k1nwNevFYrzD4gBNmLyxOR2H1QjZpk9mrofHLktrDpU/edit?usp=sharing)
- [CV Template](https://docs.google.com/presentation/d/1rc_EOZbed7cGpRr5lZPNgmSp8akTjez7ZoqkJpj_3TU/edit?usp=sharing)
- [Cover Letter Template](https://docs.google.com/document/d/1DdzriuHM4CkgcYp2rIXiKfSB7l5c-Dos8AmBceosuow/edit?usp=sharing)
- [AI Prompt Template](https://docs.google.com/document/d/1_y-80BV4zv11vouTbe9SW_rsMgXwSH_bSvrnc2Kmf3M/edit?usp=sharing)

> ℹ️ **Note on Google Apps Script:** You do **not** need to copy or paste any code manually! When you make a copy of the Google Sheet, the underlying Apps Script code is automatically copied with it. If you ever want to view or inspect the code, simply go to **Extensions > Apps Script** from the top menu in your Google Sheet.

> 💡 **Tip:** Create both French and English copies for your CV and Cover Letter templates if you plan to apply in both languages.

---

### Step 3: Customize Your Templates

- **CV & Cover Letter**:
  Update your personal details and experience. Keep the placeholders intact so the script can insert AI-generated content:
  - CV: `{{Title}}` and `{{Introduction}}`
  - Cover Letter: `{{lettre}}` (body of the letter)
- **AI Prompt**:
  Keep structural placeholders required by Sheet2Apply, but feel free to tweak section `1. Cover letter > Structure` or add details under `Personal Information` to match your background.
- **Google Sheet**:
  Do not modify header names, sheet names, or the ID formula (`=ROW()-1`).
  Available placeholders for job data:
  - `{{description}}`: Full job offer description
  - `{{langue}}`: Language choice for the AI output

---

### Step 4: Link Your Files in the Sheet

1. In your copied Google Sheet, open the **Params** tab.
2. Paste the URLs of your copied CVs, Cover Letters, AI Prompt, and target Google Drive storage folder into their respective parameter cells.

---

## 🚀 How to Use

1. Add a new job offer entry in your Google Sheet database.
2. Click the **Apply** button inside the sheet.
3. **First-time authorization**: On your first click, Google will prompt you to authorize the script.
   - Click **Continue**.
   - Select your Google account.
   - Click **Advanced** (*Paramètres avancés*) at the bottom of the warning screen.
   - Click **Go to Sheet2Apply (unsafe)** (*Accéder au projet*).
   - Click **Allow** (*Autoriser*).
4. Enter your API keys when prompted (they will be securely saved for future use).
5. Enter the **Job ID** you wish to generate documents for.
6. The script will automatically create customized Cover Letters and Resumes inside your designated Google Drive folder.

Good luck with your applications! 🍀
