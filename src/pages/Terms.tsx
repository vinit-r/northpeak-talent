import { routes } from '@/config/routes';
import { termsOfUse } from '@/content/legal';
import { LegalPage } from '@/components/sections/LegalPage';

export default function Terms() {
  return <LegalPage doc={termsOfUse} path={routes.terms} />;
}
