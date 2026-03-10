/**
 * Google Apps Script - 部署為 Web App（執行身份：我，誰可存取：所有人）
 * Sheet 名稱：NEWS，欄位：id | title | slug | excerpt | content | cover | date | seoTitle | seoDesc
 * cover 支援：完整 URL、Drive 檔名（如 1.png）、Drive 檔案 ID、Drive 分享連結
 */
const SHEET_NAME = "NEWS";
const DRIVE_COVERS_FOLDER_ID = "1VtuTtomdrT10AqZ5Ii6baeADVzWnbr7w";

function doGet(e) {
  const action = e.parameter.action || "list";

  if (action === "list") {
    return jsonOutput(getAllNews());
  }

  if (action === "detail" && e.parameter.slug) {
    return jsonOutput(getNewsBySlug(e.parameter.slug));
  }

  return jsonOutput({ error: "Invalid request" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME);
}

function getAllNews() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();

  return rows
    .filter(row => row[1]) // 有 title 才算有效資料
    .map(row => mapRow(headers, row));
}

function getNewsBySlug(slug) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();

  const found = rows.find(row => row[2] === slug);
  if (!found) return null;

  return mapRow(headers, found);
}

function mapRow(headers, row) {
  const obj = {};
  headers.forEach((key, i) => {
    obj[key] = formatValue(key, row[i]);
  });
  return obj;
}

function formatValue(key, value) {
  if (key === "date" && value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Taipei", "yyyy-MM-dd");
  }
  if (key === "cover" && value) {
    return resolveCoverUrl(String(value));
  }
  return value;
}

/**
 * 將 cover 欄位轉為可嵌入的圖片 URL
 * Drive 直接連結自 2024 年起會 403，改為透過 GAS 圖片代理
 * - 已是 http(s) 開頭：原樣回傳
 * - Drive 分享連結 / 檔案 ID / 檔名：轉為 GAS 代理 URL
 */
function resolveCoverUrl(cover) {
  if (!cover || typeof cover !== "string") return "";
  const val = cover.trim();
  if (!val) return "";

  // 已是完整 URL（非 Drive）
  if (/^https?:\/\//i.test(val) && !val.includes("drive.google.com")) return val;

  let fileId = null;

  // Drive 分享連結：/file/d/FILE_ID/view
  const fileIdMatch =
    val.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    val.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    val.match(/^([a-zA-Z0-9_-]{33,44})$/);
  if (fileIdMatch) {
    fileId = fileIdMatch[1];
  }

  // 檔名：從 Drive 資料夾查詢
  if (!fileId && /^[^/\\]+\.(png|jpg|jpeg|gif|webp)$/i.test(val)) {
    try {
      const folder = DriveApp.getFolderById(DRIVE_COVERS_FOLDER_ID);
      const files = folder.getFilesByName(val);
      if (files.hasNext()) fileId = files.next().getId();
    } catch (err) {}
  }

  if (fileId) {
    // Drive 直接連結自 2024 年起會 403，改由 Next.js API 代理
    return "/api/image?id=" + encodeURIComponent(fileId);
  }

  return val;
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
