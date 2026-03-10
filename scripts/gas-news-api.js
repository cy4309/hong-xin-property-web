/**
 * Google Apps Script - 部署為 Web App（執行身份：我，誰可存取：所有人）
 * 讀取 Sheet 第一頁，欄位：id | title | slug | excerpt | content | cover | date | seoTitle | seoDesc
 */
function doGet(e) {
  const action = e.parameter.action;
  const slug = e.parameter.slug;
  let output;

  if (action === "list") {
    output = getNewsList();
  } else if (action === "detail" && slug) {
    output = getNewsBySlug(slug);
  } else {
    output = { error: "Invalid action" };
  }

  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  if (!data || data.length < 2) return [];
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map((row) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] != null ? String(row[i]) : "";
    });
    return obj;
  });
}

function getNewsList() {
  return getSheetData();
}

function getNewsBySlug(slug) {
  const items = getSheetData();
  const found = items.find((item) => item.slug === slug);
  return found || null;
}
