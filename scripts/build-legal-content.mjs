import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/app/legal/content');

/**
 * Targeted fixes for known scraping corruption in the themeal.menu source.
 * Each entry is [search, replace] applied verbatim to the raw text.
 */
const RAW_FIXES = [
  // Terms §17 — the address line and the Sanctions paragraph were merged and
  // interleaved by the scraper. Reconstruct them as two clean lines.
  [
    'Our addreSanctions and Export Control: We operate under UAE laws and international trade restrictions. YUMGOODS FZCO will not deal with or provide any services or products to any countries or persons that are subject to sanctions by the UAE, US (OFAC), or other relevant governments. This means if you are on any restricted lists or located in a sanctioned country, we may refuse service. By ordering, you confirm you are not subject to such restrictions.ss: IFZA Properties, Dubai Silicon Oasis, Dubai, UAE',
    'Sanctions and Export Control: We operate under UAE laws and international trade restrictions. YUMGOODS FZCO will not deal with or provide any services or products to any countries or persons that are subject to sanctions by the UAE, US (OFAC), or other relevant governments. This means if you are on any restricted lists or located in a sanctioned country, we may refuse service. By ordering, you confirm you are not subject to such restrictions.\nOur address: IFZA Properties, Dubai Silicon Oasis, Dubai, UAE',
  ],
  // Privacy §1 — "Usage Data" should own two sub-bullets, but the scraper put
  // "Cookies and Tracking" before "Log and Device Data" and left it un-nested.
  // Reorder and mark both as sub-items so they nest under "Usage Data".
  [
    'Usage Data: We automatically collect certain information when you interact with our website:\n\nCookies and Tracking: We use cookies and similar tracking technologies (like web beacons or pixels) to enhance your experience (e.g., keeping you logged in, remembering preferences) and to collect analytics on site usage. Cookies may collect information about your browsing actions and patterns. (See \u201cCookies and Tracking Technologies\u201d below for more.)\n\n- Log and Device Data: IP address, browser type, device type, operating system, referring URLs, pages viewed, and the dates/times of access.',
    'Usage Data: We automatically collect certain information when you interact with our website:\n\n- Log and Device Data: IP address, browser type, device type, operating system, referring URLs, pages viewed, and the dates/times of access.\n\n- Cookies and Tracking: We use cookies and similar tracking technologies (like web beacons or pixels) to enhance your experience (e.g., keeping you logged in, remembering preferences) and to collect analytics on site usage. Cookies may collect information about your browsing actions and patterns. (See \u201cCookies and Tracking Technologies\u201d below for more.)',
  ],
  // Cyrillic homoglyph "к" → Latin in "call oк WhatsApp".
  ['call o\u043a WhatsApp', 'call or WhatsApp'],
  // Plain typos from the source.
  ['delivery pertners', 'delivery partners'],
  // Stray trailing character.
  ['maintain a cart.a', 'maintain a cart.'],
];

function applyRawFixes(raw) {
  return RAW_FIXES.reduce((text, [search, replace]) => text.split(search).join(replace), raw);
}

/** Insert a missing space after a sentence-ending period (e.g. "secure.Our"). */
function normalizeParagraph(text) {
  return text
    // Strip zero-width joiner/space artifacts (e.g. "standards.\u200dYour Choices").
    .replace(/[\u200b\u200c\u200d]/g, '')
    .replace(/([a-z\u2019)])\.([A-Z])/g, '$1. $2')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Drop duplicate paragraphs within a section (e.g. repeated "Preference Cookies"). */
function dedupeParagraphs(paragraphs) {
  const seen = new Set();
  return paragraphs.filter((para) => {
    if (seen.has(para)) return false;
    seen.add(para);
    return true;
  });
}

function parseDocument(raw, { title, lastUpdated, stopBefore }) {
  const lines = raw.split('\n');
  const stopIdx = stopBefore
    ? lines.findIndex((line) => line.trim() === stopBefore)
    : -1;
  const bodyLines = stopIdx >= 0 ? lines.slice(0, stopIdx) : lines;

  let start = 0;
  while (start < bodyLines.length && !bodyLines[start].trim().startsWith('1.')) {
    start += 1;
  }

  const sections = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    current.paragraphs = dedupeParagraphs(
      current.paragraphs.map((p) => normalizeParagraph(p)).filter(Boolean),
    );
    sections.push(current);
    current = null;
  };

  for (let i = start; i < bodyLines.length; i += 1) {
    const line = bodyLines[i].trim();
    if (!line) continue;

    const sectionMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (sectionMatch) {
      flush();
      current = {
        number: sectionMatch[1],
        title: sectionMatch[2],
        paragraphs: [],
      };
      continue;
    }

    if (!current) continue;
    current.paragraphs.push(line);
  }

  flush();

  return { title, lastUpdated, sections };
}

function toTsExport(name, doc) {
  return `/* Auto-generated from themeal.menu — run: node scripts/build-legal-content.mjs */\nexport const ${name} = ${JSON.stringify(doc, null, 2)} as const;\n`;
}

const privacyRaw = fs.readFileSync(
  'C:/Users/Bender/.cursor/projects/c-Users-Bender-Desktop-Landing-20-05-TEST/agent-tools/53309f11-802b-403b-add3-7847ae09f2b8.txt',
  'utf8',
);

const termsRaw = fs.readFileSync(
  'C:/Users/Bender/.cursor/projects/c-Users-Bender-Desktop-Landing-20-05-TEST/agent-tools/1397e9e7-fbb5-4a01-b8e0-0324b0d89d1c.txt',
  'utf8',
);

const privacyIntro = `YUMGOODS FZCO ("Company", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and Services. It also outlines your rights regarding your personal data. This policy is an integral part of our Terms and Conditions, and by using our Services, you agree to the collection and use of information in accordance with this Privacy Policy.

Note: Our privacy practices are designed to comply with applicable data protection laws in the UAE, including the Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the "UAE PDPL"). We also consider international best practices for privacy and electronic communications.`;

const termsIntro = `Welcome to THE MEAL (YUMGOODS FZCO)! These Terms and Conditions ("Terms") govern your access to and use of our website and meal plan subscription services ("Services"). By registering an account or using our Services, you agree to be bound by these Terms, so please read them carefully. If you do not agree, you should not use the website or Services.`;

const privacy = parseDocument(applyRawFixes(privacyRaw), {
  title: 'YUMGOODS FZCO – Privacy Policy',
  lastUpdated: '10 September 2025',
});
privacy.intro = privacyIntro;

const terms = parseDocument(applyRawFixes(termsRaw), {
  title: 'YUMGOODS FZCO – Terms and Conditions',
  lastUpdated: '6 September 2025',
  stopBefore: 'Meal Plan',
});
terms.intro = termsIntro;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'privacyPolicy.ts'), toTsExport('privacyPolicy', privacy));
fs.writeFileSync(path.join(OUT_DIR, 'termsAndConditions.ts'), toTsExport('termsAndConditions', terms));

console.log(`Wrote ${privacy.sections.length} privacy sections and ${terms.sections.length} terms sections.`);
