import { redirect } from 'next/navigation';
import { ROUTES } from '../../constants/routes';

export default function Product() {
  redirect(ROUTES.home);
}
