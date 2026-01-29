import { type FC } from "react";
import styled from "styled-components";
import SectionLayout from "./SectionLayout";
import SpotifyTrackCard from "../SpotifyTrackCard";

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const ContactSection: FC<ContactSectionProps> = ({ sectionRef }) => {
  return (
    <SectionLayout sectionRef={sectionRef} title="CONTACT" id="contact">
      <p>Contact</p>
      <SpotifyTrackCard />
    </SectionLayout>
  );
};

export default ContactSection;
