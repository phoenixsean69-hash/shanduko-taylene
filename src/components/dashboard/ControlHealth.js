export function ControlHealth() {
  return `<section class="figma-card service-card"><div class="figma-card-head"><h3>Volume vs Service Level</h3></div>
    <div class="service-chart">${[78,92,68,80,57,67].map(v=>`<div><i style="height:${v}px"></i><b style="height:${Math.max(18,v-28)}px"></b></div>`).join('')}</div>
    <div class="months six">${['Jan','Feb','Mar','Apr','May','Jun'].map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="service-legend"><span><i></i> Volume<br><b>1,135</b></span><span><i></i> Services<br><b>635</b></span></div>
  </section>`;
}
