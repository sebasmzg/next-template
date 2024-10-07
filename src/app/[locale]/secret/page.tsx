'use client';

import {useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';
import Category from '@/components/Category';
import AllProducts from '@/components/AllProducts';

export default function Secret() {
  const t = useTranslations('Secret');

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <Category />
      <AllProducts />
    </PageLayout>
  );
}
