import { type FC } from "react";
import styled from "styled-components";
import SectionLayout from "@/sections/layout/SectionLayout";
import SpotifyTrackCard from "../components/SpotifyTrackCard";
import PhotoStack from "../components/PhotoStack";

interface PersonalSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const PersonalSection: FC<PersonalSectionProps> = ({ sectionRef }) => {
  return (
    <SectionLayout
      sectionRef={sectionRef}
      title="PERSONAL"
      id="personal"
      paddingTop={20}
    >
      <StyledText>
        In my free time, you’ll usually find me traveling, reading, or playing
        board games with friends. Between coding sessions, I like to train for
        my next half-marathon while listening to music that keeps me going.
      </StyledText>
      <SpotifyTrackCard />
      <PhotoStack />
    </SectionLayout>
  );
};

export default PersonalSection;

const StyledText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;
