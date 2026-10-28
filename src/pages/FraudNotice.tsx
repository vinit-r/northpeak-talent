import { routes } from '@/config/routes';
import { fraudNotice } from '@/content/legal';
import { LegalPage } from '@/components/sections/LegalPage';

export default function FraudNotice() {
  return <LegalPage doc={fraudNotice} path={routes.fraudNotice} />;
}
