export const members = [
{id:'SH-001402',name:'John Tatenda Moyo',stand:'Stand 1402, Phase 2',nationalId:'63-1234567-X-45',spouse:'Mary R. Moyo',spouseNationalId:'63-7654321-Y-45',nextOfKin:'Blessing Moyo (Brother)',beneficiary:'Tinashe Moyo (Son)',allocation:'100% Asset Claim',status:'Active'},
{id:'SH-000244',name:'Chipo Gumbo',stand:'Stand 0244',nationalId:'63-2234567-A-12',spouse:'—',spouseNationalId:'—',nextOfKin:'Tafadzwa Gumbo (Sister)',beneficiary:'Rutendo Gumbo (Daughter)',allocation:'100% Asset Claim',status:'Active'},
{id:'SH-001109',name:'Farai Ndlovu',stand:'Stand 1109',nationalId:'63-3234567-B-27',spouse:'—',spouseNationalId:'—',nextOfKin:'Nyasha Ndlovu (Brother)',beneficiary:'Tanaka Ndlovu (Son)',allocation:'100% Asset Claim',status:'Active'},
{id:'SH-000812',name:'Tendai Kwenda',stand:'Stand 0812',nationalId:'63-4234567-C-31',spouse:'—',spouseNationalId:'—',nextOfKin:'Rudo Kwenda (Sister)',beneficiary:'Munyaradzi Kwenda (Son)',allocation:'100% Asset Claim',status:'Pending'}
];
export const adminLedger=[
['SHND-2026-B0411','12/04/2026','Stand 0244 - Chipo Gumbo','CBZ Bank - Kwame Nkrumah',50],
['SHND-2026-B0495','19/05/2026','Stand 1109 - Farai Ndlovu','EcoCash Business Wallet',35]
];
export const developmentLedger=[
['SHND-2026-B0892','26/06/2026','Stand 1402 - John T. Moyo','NMB Bank - Excellence Centre',450],
['SHND-2026-B0899','26/06/2026','Stand 0812 - Tendai Kwenda','CABS - Central Branch',1200]
];
export const bankBranches=['NMB Bank - Excellence Centre','CABS - Central Branch','CBZ Bank - Kwame Nkrumah','EcoCash Business Wallet'];
export const pageMeta={
dashboard:['Dashboard','Operational overview of member, receipt and ledger activity'],
members:['Member Registry','Comprehensive cooperative member and household identity records'],
'new-member':['Create New Cooperative Member Record','Primary member, spouse, dependants, beneficiary and photo evidence'],
transactions:['Central Transaction Processing Node','Route incoming funds into the correct isolated sub-ledger'],
'admin-ledger':['Admin Fees Ledger View','Operational administration, compliance certificates and staff overheads'],
'development-ledger':['Development Fees Ledger View','Civil engineering, trenching, road layers and electrical connectivity'],
audit:['Audit & Controls','Trace paper receipts, bank deposits, ledger allocation and verification events']
};
export const money=v=>`$${Number(v).toLocaleString('en-US',{minimumFractionDigits:2})}`;
