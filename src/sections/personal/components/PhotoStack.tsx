import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Photo1 from "@/assets/images/pphoto1.avif";
import Photo2 from "@/assets/images/pphoto2.avif";
import Photo3 from "@/assets/images/pphoto3.avif";
import Photo4 from "@/assets/images/pphoto4.avif";

const PhotoStack = () => {
  const images = [Photo1, Photo2, Photo3, Photo4];

  return (
    <>
      <StackWrapper>
        {images.map((src, i) => (
          <PhotoCard key={i} $index={i}>
            <StyledImg src={src} alt="" />
          </PhotoCard>
        ))}
      </StackWrapper>
      <PicText>
        Shot with my <FontAwesomeIcon icon={faMobile} />
      </PicText>
    </>
  );
};

export default PhotoStack;

export const StackWrapper = styled.section`
  position: relative;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  margin-top: ${({ theme }) => theme.spacing.s32};

  @media (max-width: 768px) {
    grid-template-rows: repeat(2, min-content);
    grid-template-columns: repeat(2, minmax(50px, 1fr));
    grid-auto-rows: min-content;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.s16};
    width: 100%;
    height: min-content;
    padding: 0;
    display: grid;
  }
`;

export const PhotoCard = styled.div<{ $index: number }>`
  position: absolute;
  width: 184px;
  height: 250px;
  border-radius: ${({ theme }) => theme.radius.r10};
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white1};
  padding: 4px;
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35);

  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;

  ${({ $index }) => {
    const offsetsLeft = [-30, 130, 290, 450];
    const offsetsBottom = [0, 15, 0, 10];
    const rotations = [-3, 2, -4, 4];
    const z = [1, 2, 3, 4];

    return `
      left: ${offsetsLeft[$index]}px;
      bottom: ${offsetsBottom[$index]}px;
      transform: rotate(${rotations[$index]}deg);
      z-index: ${z[$index]};
    `;
  }}

  &:hover {
    z-index: 10;
    transform: scale(1.05) rotate(0deg);
  }

  @media (max-width: 768px) {
    position: relative;
    width: 176px;
    height: 232px;
    transform: none;
    left: auto;
    bottom: auto;
    z-index: auto;
    place-self: center;
  }

  @media (max-width: 375px) {
    width: 140px;
    height: 200px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.r8};
`;

const PicText = styled.p`
  margin-top: 12px;
  font-size: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;
