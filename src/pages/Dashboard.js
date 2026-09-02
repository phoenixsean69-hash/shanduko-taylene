import { StatGrid } from '../components/dashboard/StatGrid.js';
import { CollectionsOverview } from '../components/dashboard/CollectionsOverview.js';
import { ReceiptInsights } from '../components/dashboard/ReceiptInsights.js';
import { RecentTransactions } from '../components/dashboard/RecentTransactions.js';
import { Satisfaction } from '../components/dashboard/Satisfaction.js';
import { TargetReality } from '../components/dashboard/TargetReality.js';
import { CountryMap } from '../components/dashboard/CountryMap.js';
import { ControlHealth } from '../components/dashboard/ControlHealth.js';

export function Dashboard() {
  return `<div class="dashboard-view">
    <section class="figma-card sales-summary"><div class="figma-card-head"><div><h3>Today's Sales</h3><small>Sales Summary</small></div><button class="export-btn"><i class="bi bi-bag"></i> Export</button></div>${StatGrid()}</section>
    <div class="top-row"><div>${ReceiptInsights()}</div></div>
    <div class="middle-grid"><div>${CollectionsOverview()}</div><div>${Satisfaction()}</div><div>${TargetReality()}</div></div>
    <div class="bottom-grid"><div>${RecentTransactions()}</div><div>${CountryMap()}</div><div>${ControlHealth()}</div></div>
  </div>`;
}
