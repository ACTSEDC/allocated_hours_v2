/**
 * ACTS EDC Hour Allocation Portal
 * Deploy as a Web app: Execute as Me, Who has access: Anyone.
 * The first row in the sheet must contain the headers used below.
 */
const CONFIG = {
  spreadsheetId: '1URx0KkT1bH6G81AzoqTlPgwUbn8Hk67DamUPkIGnt8c',
  sheetName: '', // Leave blank to use the first sheet.
  enrollmentHeaders: ['Enrollment Number', 'Enrollment', 'Enrollment No', 'enrollment'],
  nameHeaders: ['Name', 'name'],
  eventHeaders: ['EVENT NAME', 'Event', 'event'],
  roleHeaders: ['ROLE', 'Role', 'role'],
  hoursHeaders: ['HOURS ALLOTED', 'HOURS ALLOCATED', 'Hours', 'hours'],
  branchHeaders: ['Branch', 'branch'],
  yearHeaders: ['Year', 'year'],
};

function doGet(request) {
  try {
    const enrollment = String(request?.parameter?.enrollment || '').trim();
    if (!enrollment) return json_({ error: 'Enrollment number is required.' });

    // openById lets this work both as a script bound to the Sheet and as a
    // standalone project created from script.google.com.
    const spreadsheet = CONFIG.spreadsheetId
      ? SpreadsheetApp.openById(CONFIG.spreadsheetId)
      : SpreadsheetApp.getActive();
    const sheet = CONFIG.sheetName
      ? spreadsheet.getSheetByName(CONFIG.sheetName)
      : spreadsheet.getSheets()[0];
    if (!sheet) return json_({ error: 'Configured sheet was not found.' });

    const values = sheet.getDataRange().getDisplayValues();
    if (values.length < 2) return json_({ error: 'The sheet has no records yet.' });

    const headers = values[0].map(String);
    const index = (choices) => choices.map((h) => headers.indexOf(h)).find((i) => i >= 0);
    const columns = {
      enrollment: index(CONFIG.enrollmentHeaders), name: index(CONFIG.nameHeaders),
      event: index(CONFIG.eventHeaders), role: index(CONFIG.roleHeaders),
      hours: index(CONFIG.hoursHeaders), branch: index(CONFIG.branchHeaders), year: index(CONFIG.yearHeaders),
    };
    if (columns.enrollment === undefined) return json_({ error: 'Enrollment Number column was not found.' });

    const rows = values.slice(1).filter((row) => String(row[columns.enrollment]).trim() === enrollment);
    if (!rows.length) return json_({ error: 'No records found for this enrollment number.' });

    const results = rows.map((row) => ({
      event: value_(row, columns.event), role: value_(row, columns.role),
      hours: Number(String(value_(row, columns.hours)).replace(/[^0-9.-]/g, '')) || 0,
    }));
    return json_({
      name: value_(rows[0], columns.name), branch: value_(rows[0], columns.branch), year: value_(rows[0], columns.year),
      total: results.reduce((sum, item) => sum + item.hours, 0), results,
    });
  } catch (error) {
    return json_({ error: error.message || 'Unable to read the sheet.' });
  }
}

function value_(row, column) { return column === undefined ? '' : row[column]; }
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
