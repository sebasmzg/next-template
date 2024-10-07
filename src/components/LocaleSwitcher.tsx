'use client';

import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import styled from 'styled-components';

// Styled Components
const LocaleSwitcherContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const LocaleLink = styled(Link)`
  font-size: 1rem;
  color: #0070f3;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 12px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #0070f3;
    color: #ffffff;
    border-color: #0070f3;
  }
`;

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'es' : 'en';
  const pathname = usePathname();

  return (
    <LocaleSwitcherContainer>
      <LocaleLink href={pathname} locale={otherLocale}>
        {t('switchLocale', {locale: otherLocale})}
      </LocaleLink>
    </LocaleSwitcherContainer>
  );
}
