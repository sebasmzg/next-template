'use client';

import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';


type Props = {
  session: Session | null;
};

export default function Index({session}: Props) {
  const t = useTranslations('Index');

  return (
    <PageLayout title={t('title')}>
      index
    </PageLayout>
  );
}
