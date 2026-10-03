import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ConnectModal } from '@/components/modals/ConnectModal';
import { DpaRequestCard } from '@/components/sections/Legal/DpaRequestCard';
import { LegalCtaBanner } from '@/components/sections/Legal/LegalCtaBanner';
import { LegalDocument } from '@/components/sections/Legal/LegalDocument';
import { LegalHeader } from '@/components/sections/Legal/LegalHeader';
import { LegalHighlightsCard } from '@/components/sections/Legal/LegalHighlightsCard';
import { SubProcessorList } from '@/components/sections/Legal/SubProcessorList';
import {
  PRIVACY_CTA,
  PRIVACY_FACTS,
  PRIVACY_HIGHLIGHTS,
  PRIVACY_LABELS,
  PRIVACY_META,
  PRIVACY_SECTIONS,
  SUB_PROCESSORS_SECTION_ID,
} from '@/data/privacy';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const SECTION_EXTRAS = { [SUB_PROCESSORS_SECTION_ID]: <SubProcessorList /> };

export const PrivacyPolicyPage: React.FC = () => {
  const connect = useDisclosure();

  useDocumentTitle('Privacy Policy — NeoXis Studio | Data Protection & Confidentiality');

  return (
    <>
      <main className="w-full">
        <LegalHeader
          eyebrow={PRIVACY_META.eyebrow}
          title={PRIVACY_META.title}
          intro={PRIVACY_META.intro}
          facts={PRIVACY_FACTS}
        />
        <LegalDocument
          sections={PRIVACY_SECTIONS}
          labels={PRIVACY_LABELS}
          sectionExtras={SECTION_EXTRAS}
          highlightIcon={<ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />}
          sidebar={
            <>
              <LegalHighlightsCard
                highlights={PRIVACY_HIGHLIGHTS}
                icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
                glowClassName="bg-blue-500/10"
              />
              <DpaRequestCard />
            </>
          }
          cta={
            <LegalCtaBanner
              copy={PRIVACY_CTA}
              primary={{ label: 'Contact DPO', href: `mailto:${PRIVACY_META.dpoEmail}` }}
              secondary={{ label: 'Start a Conversation', onClick: connect.open }}
            />
          }
        />
      </main>

      <ConnectModal isOpen={connect.isOpen} onClose={connect.close} />
    </>
  );
};
