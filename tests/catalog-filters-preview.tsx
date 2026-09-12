import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FilterFactory } from '../src/app/catalog/[type]/components/FiltersPanel/FiltersFabric/FilterFactory';
import { CatalogPrimaryFilter } from '../src/app/catalog/[type]/components/CatalogBoard/CatalogPrimaryFilter/CatalogPrimaryFilter';
import type { IFilterConfig, IFiltersState, IMultiSelectFilterConfig } from '../src/app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces';
import { isFilterVisible, normalizeAttributeFilters } from '../src/app/catalog/[type]/utils/catalogAttributeFilters';
const primary: IMultiSelectFilterConfig = { id: 'type', category: 'spirit', type: 'multi_select', field: 'subcategory', name: 'Тип напитка', options: [{value:'whisky',label:'Виски'},{value:'cognac',label:'Коньяк'}] };
const config: IFilterConfig[] = [
  { id:'region', category:'spirit', type:'multi_select', field:'region', name:'Регион', selectionMode:'value', options:[{value:'cognac',label:'Коньяк'}] },
  { id:'whiskyType', category:'spirit', type:'multi_select', field:'whiskyType', name:'Тип виски', subtype:'whisky', selectionMode:'value', options:[{value:'single_malt',label:'Односолодовый'},{value:'blended',label:'Купажированный'}] },
  { id:'whiskyAge', category:'spirit', type:'range', field:'whiskyAge', name:'Заявленный возраст виски', subtype:'whisky', min:3,max:18,unit:'лет',steps:[] },
  { id:'cognacClassification', category:'spirit', type:'multi_select', field:'cognacClassification', name:'Классификация коньяка', subtype:'cognac', selectionMode:'value', options:[{value:'vsop',label:'VSOP'}] },
];
function Preview() {
  const [filters,setFilters] = useState<IFiltersState>({subcategory:['Виски']});
  const update = (field: string, value: IFiltersState[string]) => setFilters(prev=>normalizeAttributeFilters({...prev,[field]:value}));
  return <main style={{maxWidth:860,margin:'32px auto',padding:20,fontFamily:'Arial',color:'#242424'}}>
    <h1>Крепкие напитки — фильтры</h1>
    <CatalogPrimaryFilter filterConfig={primary} value={filters.subcategory as string[]} onChange={value=>update('subcategory',value)} />
    <section style={{maxWidth:360,marginTop:24}}>{config.filter(f=>isFilterVisible(f,filters)).map(f=><div key={f.id} style={{marginBottom:20}}><FilterFactory filterConfig={f} filtersState={filters} onUpdateFilterArray={update} facets={{total:1,options:{whiskyType:{single_malt:1,blended:0},region:{cognac:1},cognacClassification:{vsop:1}}}}/></div>)}</section>
    <pre aria-label="Выбранные фильтры" style={{whiteSpace:'pre-wrap',background:'#f4f4f4',padding:16}}>{JSON.stringify(filters,null,2)}</pre>
  </main>;
}
createRoot(document.getElementById('root')!).render(<Preview/>);
