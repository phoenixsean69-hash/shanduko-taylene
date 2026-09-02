export function CollectionsOverview() {
  const online = [14,17,6,16,12,17,13], offline=[12,11,20,7,10,13,10];
  return `<section class="figma-card revenue-card">
    <div class="figma-card-head"><h3>Total Revenue</h3><span></span></div>
    <div class="mini-chart">
      <div class="y-labels"><span>25k</span><span>20k</span><span>15k</span><span>10k</span><span>5k</span><span>0</span></div>
      <div class="chart-bars">${online.map((v,i)=>`<div class="revenue-bar-group"><i style="height:${v*3}px"></i><b style="height:${offline[i]*3}px"></b></div>`).join('')}</div>
      <div class="x-labels">${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(x=>`<span>${x}</span>`).join('')}</div>
    </div>
    <div class="chart-legend"><span><i></i> Online Sales</span><span><i></i> Offline Sales</span></div>
  </section>`;
}
