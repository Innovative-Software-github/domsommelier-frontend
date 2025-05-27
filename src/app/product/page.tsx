import { redirect } from 'next/navigation';
import { routes } from '../../constants/routes/routes';

export default function Product() {
  // todo: правильно направить редирект когда появится route менеджер
  redirect(routes.home.href);
}
