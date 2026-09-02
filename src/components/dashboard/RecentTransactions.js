export function RecentTransactions() {
  const products=[['01','Home Decor Range','45%'],['02','Disney Princess Pink Bag 18”','29%'],['03','Bathroom Essentials','18%'],['04','Apple Smartwatches','25%']];
  return `<section class="figma-card products-card"><div class="figma-card-head"><h3>Top Products</h3></div>
    <div class="product-head"><span>#</span><span>Name</span><span>Popularity</span><span>Sales</span></div>
    ${products.map(([n,name,p])=>`<div class="product-row"><span>${n}</span><strong>${name}</strong><span class="product-progress"><i style="width:${p}"></i></span><em>${p}</em></div>`).join('')}
  </section>`;
}
