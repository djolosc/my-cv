import { type FC } from "react";
import styled from "styled-components";

import SectionLayout from "@/shared/layout/SectionLayout";

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const ContactSection: FC<ContactSectionProps> = ({ sectionRef }) => {
  return (
    <SectionLayout sectionRef={sectionRef} title="CONTACT" id="contact">
      <p>Contact</p>
    </SectionLayout>
  );
};

export default ContactSection;
