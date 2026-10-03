import React from 'react';
import { ConnectModal } from '@/components/modals/ConnectModal';
import { LegalCtaBanner } from '@/components/sections/Legal/LegalCtaBanner';
import { LegalDocument } from '@/components/sections/Legal/LegalDocument';
import { LegalHeader } from '@/components/sections/Legal/LegalHeader';
import { LegalHighlightsCard } from '@/components/sections/Legal/LegalHighlightsCard';
import { TERMS_CTA, TERMS_FACTS, TERMS_HIGHLIGHTS, TERMS_LABELS, TERMS_META, TERMS_SECTIONS } from '@/data/terms';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const TermsAndConditionsPage: React.FC = () => {
  const connect = useDisclosure();

  useDocumentTitle('Terms & Conditions — NeoXis Studio | Legal Framework');

  return (
    <>
      <main className="w-full">
        <LegalHeader
          eyebrow={TERMS_META.eyebrow}
          title={TERMS_META.title}
          intro={TERMS_META.intro}
          facts={TERMS_FACTS}
        />
        <LegalDocument
          sections={TERMS_SECTIONS}
          labels={TERMS_LABELS}
          sidebar={<LegalHighlightsCard highlights={TERMS_HIGHLIGHTS} glowClassName="bg-purple-500/10" />}
          cta={<LegalCtaBanner copy={TERMS_CTA} primary={{ label: 'Start a Conversation', onClick: connect.open }} />}
        />
      </main>

      <ConnectModal isOpen={connect.isOpen} onClose={connect.close} />
    </>
  );
};
