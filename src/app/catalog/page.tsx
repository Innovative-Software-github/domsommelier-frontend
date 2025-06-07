import { redirect } from 'next/navigation';
import { routes } from '../../constants/routes';

export default function Catalog() {
  redirect(routes.catalog.children?.wine.href as string);
}
