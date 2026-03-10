# Google Sheet 假資料設定

## 1. 建立 Google Sheet

建立新試算表，**第一頁（Sheet1）** 第一列輸入標題列：

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
| cover | https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800 |
| date | 2025-03-01 |
| seoTitle | 2025年房貸利率趨勢 \| 泓鑫資產管理顧問 |
| seoDesc | 2025年房貸利率趨勢分析與資金規劃建議，台北房貸轉貸、資金整合專業諮詢。 |

## 3. GAS 腳本

若尚未設定，請將 `scripts/gas-news-api.js` 複製到 Google Apps Script 編輯器：

1. 試算表 → 擴充功能 → Apps Script
2. 貼上 `gas-news-api.js` 內容
3. 部署 → 新增部署 → 類型：網頁應用程式
4. 執行身份：我，誰可存取：所有人
5. 複製部署 URL 到 `.env.local` 的 `NEXT_PUBLIC_SHEET_API`

## 4. 驗證

- 列表：`{NEXT_PUBLIC_SHEET_API}?action=list`
- 詳情：`{NEXT_PUBLIC_SHEET_API}?action=detail&slug=2025-mortgage-trends`
