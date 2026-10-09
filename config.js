// AI Model name and drive URLs

function getConfig() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("params");

  return {
    modelId: sheet.getRange("B1").getValue().toString().trim(),
    templateDocID : extractDriveId(sheet.getRange("B2").getValue().toString().trim()),
    templateSlideID: extractDriveId(sheet.getRange("B3").getValue().toString().trim()),
    templateDocID_EN: extractDriveId(sheet.getRange("B4").getValue().toString().trim()),
    templateSlideID_EN: extractDriveId(sheet.getRange("B5").getValue().toString().trim()),
    destinationFolderID: extractDriveId(sheet.getRange("B6").getValue().toString().trim()),
    promptID: extractDriveId(sheet.getRange("B7").getValue().toString().trim())
  };
}

/**
 * Extrait l'ID Google Drive depuis une URL complète (Doc, Sheet, Slides, Dossier)
 * ou renvoie la chaîne nettoyée si l'utilisateur a entré directement l'ID brut.
 *
 * @param {string} urlOrId - L'URL complète ou l'ID récupéré depuis le Sheet.
 * @return {string} L'ID Google Drive.
 */
function extractDriveId(urlOrId) {
  if (!urlOrId) return "";

  const text = urlOrId.toString().trim();

  // 1. URL de Fichier / Doc / Slide / Sheet (.../d/ID/...)
  const fileMatch = text.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return fileMatch[1];
  }

  // 2. URL de Dossier Drive (.../folders/ID...)
  const folderMatch = text.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    return folderMatch[1];
  }

  // 3. Cas où l'utilisateur a collé directement l'ID brut (sans URL)
  // Les IDs Google Drive font généralement au moins 25 caractères
  const idMatch = text.match(/^[a-zA-Z0-9_-]{25,}$/);
  if (idMatch) {
    return text;
  }

  // Par sécurité, renvoie le texte nettoyé si rien n'a été reconnu
  return text;
}
