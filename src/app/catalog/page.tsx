import { redirect } from 'next/navigation';

export default function Catalog() {
  // todo: правильно направить редирект когда появится route менеджер
  redirect('/catalog/wine');
}
