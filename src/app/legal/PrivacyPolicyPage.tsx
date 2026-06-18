import { privacyPolicy } from './content/privacyPolicy';
import { LegalDocumentPage } from './LegalDocumentPage';

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage document={privacyPolicy} current="privacy" />;
}
