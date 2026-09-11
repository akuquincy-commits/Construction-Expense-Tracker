# Construction Expense Tracker

A static web application for tracking construction project expenses in real-time with detailed categorization and analytics.

## Features

- **Add Expenses** - Record expenses with name, category, amount, and date
- **Categorize Spending** - Organize expenses by category (Labour, Transportation, Materials, Utilities, Other)
- **Real-time Analytics** - View total expenses, highest expense, lowest expense, and count
- **Period Filtering** - Filter expenses by time period (Today, This Month)
- **Search** - Search through expenses quickly
- **Export** - Export expense data to CSV format
- **Data Persistence** - All data saved locally using browser's localStorage

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- localStorage for data persistence

## How to Use

1. Open `index.html` in your browser
2. Enter expense details:
   - **Name** - Description of the expense
   - **Category** - Select from predefined categories
   - **Price** - Amount spent
   - **Date** - When the expense occurred
3. Click **+ Add Expense** to record it
4. View analytics panel showing totals and breakdowns
5. Use search bar to find specific expenses
6. Click **Export CSV** to download expense records

## Project Purpose

Portfolio project built to practice JavaScript DOM manipulation, event handling, and data management with localStorage.

## Notes

- Data is stored locally in your browser and will persist across sessions
- Clearing browser data/cache will delete all expense records
- No backend or database - all data is client-side only
