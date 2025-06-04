import { redirect } from 'next/navigation';
import { routes } from '../../constants/routes/routes';

export default function Product() {
  redirect(routes.home.href);
}
