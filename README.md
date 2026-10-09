# 📩 Sheet2Apply

Sheet2Apply helps you organize and fasten your job search. It offers a Google Sheet template to follow-up your applications, save your job opportunities and their main characteristics (Title, Company, Status, Description, etc.).

Besides the sheet template, it automatizes the creation of customized application documents (Cover Letter, CV) directly in your Google Drive. Based on dedicated templates and leveraging on AI API, you can automatically customize your documents to a specific job offer and to your skills to get a first draft for your application.

---

## ✨ Features

- **Automatisation** :
  - Google Maps API: Retrieve automatically the company address.
  - Clean your Google Sheet Database to stay organise
  - Automatically fill information for new applications (CreationDate, Default Language, etc.)
- **Customize your application documents** :
  - *CV*: Adapt title and introduction based on the job offer and your skills.
  - *Cover Letter*: Write automatically a first draft with specific rules AI need to follow to match your style.
- **Dynamic Folder Organization** : Organisation automatique par année et trimestre.
- **Safety** : Store your API keys through `PropertiesService`.
- **Language** : Apply both in English or French.

---

## 🛠️ Technologies

- **Language** : Google Apps Script (JavaScript ES6)
- **Google Services** : Google Sheets, Google Drive, Google Docs, Google Slides
- **APIs** : Gemini API, Google Maps API

---

## 📋 Requirements

Before starting, make sure you have :
- A Google account with access to **Google Drive** and **Google Sheets**.
- Gemini API Key
- Google Maps API Key

---

## 📊 Templates

- Google Sheet Follow-up File:
- CV:
- Cover Letter:
- AI Prompt:

## ⚙️ Configuration & Installation

1. **Cloner / Copier le projet** :
   - Ouvre ton Google Sheet principal.
   - Va dans `Extensions` > `Apps Script`.
   - Copie les fichiers du dossier `/src` dans l'éditeur Apps Script.

2. **Configurer l'onglet `params`** :
   Dans la feuille Google Sheets, crée un onglet nommé `params` avec la structure suivante :

   | Cellule | Description |
   | :--- | :--- |
   | `B1` | Identifiant du modèle (ex: `gemini-1.5-pro`) |
   | `B2` | URL ou ID du dossier Google Drive cible |
   | `B3` | URL ou ID du template Google Doc |

3. **Première exécution** :
   - Lance la fonction `apply()` ou modifie une cellule pour initialiser les clés d'API requises via l'invite de commande.

---

## 📁 Structure du projet

```text
├── src/
│   ├── config.gs         # Gestion de la configuration et des paramètres
│   ├── apply.gs          # Logique principale du traitement
│   ├── triggers.gs       # Trigger onEdit pour l'automatisation
│   └── utils.gs          # Fonctions d'extraction d'ID et helpers
└── README.md
