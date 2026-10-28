import { routes } from '@/config/routes';
import { privacyPolicy } from '@/content/legal';
import { LegalPage } from '@/components/sections/LegalPage';

export default function Privacy() {
  return <LegalPage doc={privacyPolicy} path={routes.privacy} />;
}
