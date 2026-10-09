function apply() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DataBase");
  const row = getJobRow(); //Ask for which Job ID we should apply

  const params = getConfig();

  // Create a dict {header : job_value}
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
  const rowData = Object.fromEntries(headers.map((header, index) => [header, values[index]]));

  // Faire une vérification que toutes les informations sont là

  // Get job information from the dictionnary
  const company = rowData["Company"];
  const job = rowData["Title"];
  const description = rowData["Description"];
  const language = rowData["Language"];
  const location = rowData["Location"];

  // Google Api to find address of the company
  const address = getAddress(company, location)

  if (language === "English") {
    var template_doc = params.templateDocID_EN
    var template_slide = params.templateSlideID_EN
  } else {
    var template_doc = params.templateDocID
    var template_slide = params.templateSlideID
  }

  // Prepare the prompt and get AI answer
  let masterPrompt = getPromptFromDoc();
  let promptFinal = masterPrompt
    .replace("{{description}}", description)
    .replace("{{language}}", language);

  const AIanswer = JSON.parse(AIcall(promptFinal));

  const AIbody = AIanswer.lettre.replace(/\\n/g, '\n');
  const AItitle = AIanswer.cv_title;
  const AIintro = AIanswer.cv_intro;

  // Create Folder in the Drive
  const now = new Date();
  const dateStr = Utilities.formatDate(now, "GMT+1", "MM-dd");
  const dateletter = Utilities.formatDate(now, "GMT+1", "dd-MM-yyyy");
  const FileName = `${dateStr}_LM_${company}`;

  const mainParentFolder = DriveApp.getFolderById(params.destinationFolderID);
  const year = now.getFullYear();
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  const quarterFolderName = `${year} - Q${quarter}`; // e.g., "2026 - Q1"

  const quarterFolders = mainParentFolder.getFoldersByName(quarterFolderName);
  let quarterFolder;

  // Check if folder already exists, otherwise create it
  if (quarterFolders.hasNext()) {
    quarterFolder = quarterFolders.next();
  } else {
    quarterFolder = mainParentFolder.createFolder(quarterFolderName);
  }

  const SubFolderName = `${dateStr}_${company}`;
  const subFolder = quarterFolder.createFolder(SubFolderName);

  // Prepare the cover letter
  const copieId = DriveApp.getFileById(template_doc).makeCopy(FileName, subFolder).getId();
  const doc = DocumentApp.openById(copieId);

  const body = doc.getBody();
  body.replaceText("{{Company}}", company);
  body.replaceText("{{Job_Name}}", job);
  body.replaceText("{{Date}}", dateletter);
  body.replaceText("{{Company_Loc}}", address)

  const AIparagraphs = AIbody.split("\n");

  AIparagraphs.forEach(text => { // Format text
  if (text.trim() !== "") {
    const p = body.appendParagraph(text);
    p.setSpacingAfter(6);
    p.setLineSpacing(1.15);
    p.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    p.setForegroundColor("#000000");
  }})
  doc.saveAndClose();

  // Prepare the CV
  const copieIdSlides = DriveApp.getFileById(template_slide)
    .makeCopy(`CV_${company}`, subFolder)
    .getId();

  const presentation = SlidesApp.openById(copieIdSlides);

  presentation.replaceAllText("{{TITLE}}", AItitle);
  presentation.replaceAllText("{{Introduction}}", AIintro);

  presentation.saveAndClose();

  // Add a link to easily access to the drive folder
  const targetCell = sheet.getRange(row, 2);
  const existingText = targetCell.getValue() || "Folder Link"; // Texte par défaut si vide
  const URLFolder = subFolder.getUrl();

  const richText = SpreadsheetApp.newRichTextValue()
    .setText(existingText.toString())
    .setLinkUrl(URLFolder)
    .build();

  targetCell.setRichTextValue(richText);

  const ID = row - 1

  SpreadsheetApp.getUi().alert(`Application n°${ID} for ${company} is ready!`);
}
