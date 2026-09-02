export function TargetReality() {
  const a=[45,58,38,67,52,61,74], b=[55,72,61,84,65,78,91];
  return `<section class="figma-card target-card"><div class="figma-card-head"><h3>Target vs Reality</h3></div>
    <div class="target-bars">${a.map((v,i)=>`<div><b style="height:${v}px"></b><i style="height:${b[i]}px"></i></div>`).join('')}</div>
    <div class="months seven">${['Jan','Feb','Mar','Apr','May','June','July'].map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="target-legend"><span><i class="real"></i>Reality Sales <b>8,823</b></span><span><i class="target"></i>Target Sales <b>12,122</b></span></div>
  </section>`;
}
