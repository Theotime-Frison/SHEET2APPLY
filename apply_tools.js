function getPromptFromDoc() {
  try {
    const doc = DocumentApp.openById(getConfig().promptID);
    return doc.getBody().getText();
  } catch (e) {
    throw new Error("Impossible to read the prompt document. Check Id and permissions.");
  }
}

function getJobRow() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DataBase");
  const valid_ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();

  let answer;
  let ParsedID;

  // Ensure the user return a valid ID
  while (true) {
    answer = Browser.inputBox(
      "Automatic Application",
      "Specify job ID to be prepared:",
      Browser.Buttons.OK_CANCEL
    );

    if (answer === "cancel" || answer === "") return;

    ParsedID = parseInt(answer.trim(), 10);

    // If the ID is valid, then we can continue
    if (!isNaN(ParsedID) && valid_ids.includes(ParsedID)) {
      break;
    }

    // Else we display an error box
    Browser.msgBox(
      "Invalid ID",
      `The ID "${answer}" is invalid.\nPlease fill in an existing ID from Column A.`,
      Browser.Buttons.OK
    );
  }
  return ParsedID + 1

}

function AIcall(prompt) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("params");
  const modelId = getConfig().modelId

  var gemini_key = getGeminiApiKey()

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${gemini_key}`;

  const payload = {
    "contents": [{"parts": [{"text": prompt}]}]
  };
  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  return json.candidates[0].content.parts[0].text;
}

function getAddress(companyName, city) {
  var apiKey = getGoogleMapsApiKey()

  var query = encodeURIComponent(companyName + " " + city);
  var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json" +
            "?input=" + query +
            "&inputtype=textquery" +
            "&fields=formatted_address,name" +
            "&key=" + apiKey;

  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());

  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].formatted_address;
  } else {
    return "Adress not found";
  }}
