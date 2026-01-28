import { type FC } from "react";
import styled from "styled-components";
import SectionLayout from "./SectionLayout";
import SpotifyTrackCard from "../SpotifyTrackCard";

interface PersonalSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const PersonalSection: FC<PersonalSectionProps> = ({ sectionRef }) => {
  return (
    <SectionLayout sectionRef={sectionRef} title="PERSONAL" id="personal">
      <StyledText>
        In my free time, you’ll usually find me traveling, reading, or playing
        board games with friends. Between coding sessions, I like to train for
        my next half-marathon while listening to music that keeps me going.
      </StyledText>
      <SpotifyTrackCard />
    </SectionLayout>
  );
};

export default PersonalSection;

const StyledText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;
