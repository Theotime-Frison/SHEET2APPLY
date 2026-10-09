/**
 * Set Default View on the Sheet "DataBase" :
 * - Hide all applications for which the status is not "To Apply" or "Applied".
 * - Sort table by decreasing Creation_Date.
 *
 * @throws {Error} If the sheet "DataBase" does not exist or if columns 'Creation_Date' or 'Statut' are missing.
 * @returns {void}
 */

function default_view() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DataBase");
  const range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  const headers = range.getValues()[0];

  const creationDateCol = headers.indexOf("Creation_Date") + 1;
  const statusCol = headers.indexOf("Status") + 1;

  if (creationDateCol === 0 || statusCol === 0) {
    throw new Error("The Columns 'Creation_Date' or 'Status' are missing.");
  }

  // Create filter if it does not exist
  let filter = range.getFilter();
  if (!filter) {
    range.createFilter();
    filter = range.getFilter();
  }

  const allValues = sheet
  .getRange(2, statusCol, sheet.getLastRow() - 1, 1)
  .getValues()
  .flat()
  .filter(String);

  const hiddenValues = allValues.filter(value =>
    value !== "To Apply" && value !== "Applied"
  );

  const criteria = SpreadsheetApp.newFilterCriteria()
    .setHiddenValues(hiddenValues)
    .build();

  filter.setColumnFilterCriteria(statusCol, criteria);

  // Sort the range
  filter.sort(creationDateCol, false);
  filter.sort(statusCol, false);
}
