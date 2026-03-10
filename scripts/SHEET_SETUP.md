# Google Sheet 假資料設定

## 1. 建立 Google Sheet

建立新試算表，新增分頁並命名為 **NEWS**，第一列輸入標題列：

| id | title | slug | excerpt | content | cover | date | seoTitle | seoDesc |
|----|-------|------|---------|---------|-------|------|----------|---------|

## 2. 貼上假資料（第二列）

| 欄位 | 值 |
|------|-----|
| id | 1 |
| title | 2025年房貸利率趨勢與資金規劃建議 |
| slug | 2025-mortgage-trends |
| excerpt | 隨著央行貨幣政策調整，房貸利率將如何影響您的購屋與轉貸決策？本文整理最新趨勢與實務建議。 |
| content | 隨著央行貨幣政策調整，房貸利率將如何影響您的購屋與轉貸決策？\n\n【重點整理】\n• 目前房貸利率區間與各家銀行差異\n• 轉貸時機判斷與試算要點\n• 資金整合與負債優化策略\n\n若有房貸或資金規劃需求，歡迎聯繫泓鑫資產管理顧問，由專業顧問為您量身規劃。 |
| cover | 1.png |

**cover 欄位說明（使用 Google Drive 圖片）**：可填以下任一格式，GAS 會自動轉為可嵌入的圖片 URL：

- **檔名**：如 `1.png`、`2.jpg`（從 [Drive 封面資料夾](https://drive.google.com/drive/folders/1VtuTtomdrT10AqZ5Ii6baeADVzWnbr7w) 依檔名查詢）
- **檔案 ID**：直接填 Drive 檔案 ID（約 33–44 字元）
- **分享連結**：`https://drive.google.com/file/d/xxx/view?usp=sharing`
- **完整 URL**：其他 http(s) 圖片網址（原樣使用）

⚠️ Drive 檔案需設為「知道連結的任何人」可檢視，圖片才能正常顯示。

| date | 2025-03-01 |
| seoTitle | 2025年房貸利率趨勢 \| 泓鑫資產管理顧問 |
| seoDesc | 2025年房貸利率趨勢分析與資金規劃建議，台北房貸轉貸、資金整合專業諮詢。 |

## 3. GAS 腳本與 Drive 封面資料夾

若尚未設定，請將 `scripts/gas-news-api.js` 複製到 Google Apps Script 編輯器：

1. 試算表 → 擴充功能 → Apps Script
2. 貼上 `gas-news-api.js` 內容
3. 確認 `DRIVE_COVERS_FOLDER_ID` 為您的封面圖片資料夾 ID（預設：`1VtuTtomdrT10AqZ5Ii6baeADVzWnbr7w`）
4. 部署 → 新增部署 → 類型：網頁應用程式
5. 執行身份：我，誰可存取：所有人
6. 複製部署 URL 到 `.env.local` 的 `NEXT_PUBLIC_SHEET_API`

**Drive 資料夾**：封面圖片請放在 [hong-xin-property-web-covers-test](https://drive.google.com/drive/folders/1VtuTtomdrT10AqZ5Ii6baeADVzWnbr7w)，每張圖片設為「知道連結的任何人」可檢視。

## 4. 驗證

- 列表：`{NEXT_PUBLIC_SHEET_API}?action=list`
- 詳情：`{NEXT_PUBLIC_SHEET_API}?action=detail&slug=2025-mortgage-trends`
