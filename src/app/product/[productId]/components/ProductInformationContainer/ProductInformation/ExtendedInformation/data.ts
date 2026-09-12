import type { TProduct } from '@/services/products/interfaces/base';
import type { CatalogReference, DurationRange, GrapeShare, SourceRating } from '@/services/products/interfaces/attributes';

export interface InformationSection { title: string; rows: { label: string; text: string }[] }
export interface RatingItem { label: string; value: number }
const number = (n: number) => n.toLocaleString('ru-RU');
const labels = (values?: CatalogReference[] | null) => values?.map(v => v?.label).filter(Boolean).join(', ');
export function duration(value?: DurationRange | null): string | undefined {
  if (!value || value.min == null && value.max == null) return;
  if (value.min != null && value.max != null && value.min === value.max && value.minInclusive && value.maxInclusive) return `${number(value.min)} мес.`;
  const parts = [];
  if (value.min != null) parts.push(`${value.minInclusive ? 'от' : 'более'} ${number(value.min)}`);
  if (value.max != null) parts.push(`${value.maxInclusive ? 'до' : 'менее'} ${number(value.max)}`);
  return `${parts.join(' ')} мес.`;
}
function grapes(values?: GrapeShare[] | null) {
  return values?.filter(v => v?.grape?.label).map(v => `${v.grape.label}${v.percent != null ? ` — ${number(v.percent)}%` : ''}`).join(', ');
}
export function extendedInformation(product: TProduct) {
  const sections: InformationSection[] = [];
  const ratings: RatingItem[] = [];
  if (!['wine', 'champagne_and_sparkling', 'spirit'].includes(product.productCategoryName)) return { sections, ratings };
  // Narrow the discriminated union before reading optional beverage attributes.
  if (product.productCategoryName !== 'wine' && product.productCategoryName !== 'champagne_and_sparkling' && product.productCategoryName !== 'spirit') return { sections, ratings };
  const d = product.details;
  const section = (title: string) => {
    const block: InformationSection = { title, rows: [] }; sections.push(block);
    return (label: string, text: string | number | null | undefined) => {
      if (text != null && String(text).trim()) block.rows.push({ label, text: String(text) });
    };
  };
  const origin = section('Происхождение и состав');
  origin('Регион', d.region?.label); origin('Апелласьон', d.appellation?.label);
  if ('grapeComposition' in d) {
    origin('Виноград', grapes(d.grapeComposition));
    if (d.grapeComposition?.length && d.grapeCompositionComplete === false) origin('Состав', 'Доли сортов указаны не полностью');
  }
  if ('styleTags' in d) origin('Стиль', labels(d.styleTags));
  if (product.productCategoryName === 'champagne_and_sparkling') {
    const sparkling = product.details;
    if (sparkling.vintageStatus === 'non_vintage') origin('Винтаж', 'Невинтажное');
    origin('Метод производства игристого', sparkling.sparklingMethod?.label);
  }
  const production = section('Производство и выдержка');
  production('Способ производства', d.productionMethod);
  const aging = d.aging;
  if (aging?.status === 'not_aged') production('Выдержка', 'Без выдержки');
  if (aging?.status === 'aged') production('Выдержка', 'Выдержанное');
  production('Ёмкости выдержки', labels(aging?.vessels));
  production('Срок выдержки', duration(aging?.durationMonths));
  production('Особенности выдержки', aging?.description);
  if (product.productCategoryName === 'spirit') {
    const spirit = product.details;
    const whisky = spirit.whiskyDetails;
    if (whisky) {
      origin('Тип виски', whisky.whiskyType?.label); origin('Состав купажа', whisky.blendStyle?.label);
      origin('Количество компонентов', whisky.componentCount);
      if (whisky.ageStatementYears != null) production('Возраст виски', `${number(whisky.ageStatementYears)} лет`);
      else if (whisky.ageStatementStatus === 'nas') production('Возраст виски', 'Без указания возраста (NAS)');
    }
    const cognac = spirit.cognacDetails;
    if (cognac) {
      origin('Область происхождения', cognac.originArea?.label);
      origin('Виноград', grapes(cognac.grapeComposition));
      if (cognac.grapeComposition?.length && cognac.grapeCompositionComplete === false) origin('Состав', 'Доли сортов указаны не полностью');
      production('Классификация коньяка', cognac.ageClassification?.label);
      if (cognac.ageStatementYears != null) production('Возраст коньяка', `${number(cognac.ageStatementYears)} лет`);
    }
    [...(spirit.agingStages || [])].filter(Boolean).sort((a, b) => a.order - b.order).forEach(stage => {
      const purposes = { primary: 'Основная выдержка', finish: 'Финишная выдержка', unspecified: 'Выдержка' };
      const add = section(`${purposes[stage.purpose] || 'Выдержка'} · этап ${stage.order}`);
      add('Ёмкость', stage.vessel?.label); add('Древесина', stage.wood?.label);
      add('Предыдущее содержимое', stage.previousContents?.label); add('Продолжительность', duration(stage.durationMonths));
    });
  }
  const tasting = section('Аромат и вкус');
  tasting('Ароматы', labels(d.aromaTags)); tasting('Вкусовые ноты', labels(d.flavorTags));
  const serving = section('Подача и хранение');
  if (d.servingTemperature) {
    const { min, max } = d.servingTemperature;
    serving('Температура подачи', `${min === max ? number(min) : `${number(min)}–${number(max)}`} °C`);
  }
  serving('Гастрономические сочетания', labels(d.foodPairingTags));
  if ('servingTags' in d) serving('Способы подачи', labels(d.servingTags));
  if ('aerationRecommendation' in d && d.aerationRecommendation) {
    serving('Аэрация', { recommended: 'Рекомендуется', not_recommended: 'Не рекомендуется', optional: 'По желанию' }[d.aerationRecommendation]);
  }
  if ('cellaringPotential' in d && d.cellaringPotential) {
    const { minYears, maxYears, reference } = d.cellaringPotential;
    const suffix = { vintage: 'от года урожая', bottling: 'от розлива', purchase: 'от покупки', unspecified: '(начало отсчёта не указано)' }[reference];
    serving('Потенциал хранения', `${minYears === maxYears ? number(minYears) : `${number(minYears)}–${number(maxYears)}`} лет ${suffix || ''}`);
  }
  const rate = (label: string, rating?: SourceRating | null) => {
    if (rating && Number.isFinite(rating.value) && rating.value >= 1 && rating.value <= 5) ratings.push({ label, value: rating.value });
  };
  if ('sensoryProfile' in d && d.sensoryProfile) {
    const names = { sweetness: 'Сладость', acidity: 'Кислотность', aromaticIntensity: 'Ароматичность', body: 'Тело', tannins: 'Танины' };
    (Object.keys(names) as (keyof typeof names)[]).forEach(key => rate(names[key], d.sensoryProfile?.[key]));
  }
  if ('sensoryRatings' in d) d.sensoryRatings?.forEach(item => { if (item?.dimension?.label) rate(item.dimension.label, item.rating); });
  return { sections: sections.filter(s => s.rows.length), ratings };
}
