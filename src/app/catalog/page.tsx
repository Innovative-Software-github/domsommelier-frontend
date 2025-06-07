import { redirect } from 'next/navigation';
import { PRODUCT_TYPES_SEGMENTS } from '../../constants/routes';

export default function Catalog() {
  redirect(PRODUCT_TYPES_SEGMENTS.wine);
}
