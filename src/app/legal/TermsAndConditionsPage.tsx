import { termsAndConditions } from './content/termsAndConditions';
import { LegalDocumentPage } from './LegalDocumentPage';

export default function TermsAndConditionsPage() {
  return <LegalDocumentPage document={termsAndConditions} current="terms" />;
}
