export function ReceiptInsights() {
  return `<section class="figma-card visitor-card">
    <div class="figma-card-head"><h3>Visitor Insights</h3></div>
    <svg viewBox="0 0 430 170" class="line-chart" preserveAspectRatio="none">
      <path d="M5 55 C45 15 70 55 105 70 S155 125 205 70 S270 15 315 65 S370 110 425 125" class="purple-line"/>
      <path d="M5 65 C45 35 75 40 105 82 S155 95 205 45 S270 30 315 62 S370 98 425 128" class="red-line"/>
      <path d="M5 45 C50 10 80 30 110 50 S155 95 205 58 S260 18 315 48 S365 70 425 118" class="green-line"/>
      <line x1="265" y1="18" x2="265" y2="140" class="focus-line"/>
      <circle cx="265" cy="47" r="4" class="focus-dot"/>
    </svg>
    <div class="months">${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'].map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="chart-legend"><span><i class="purple"></i>Loyal Customers</span><span><i class="red"></i>New Customers</span><span><i class="green"></i>Unique Customers</span></div>
  </section>`;
}
