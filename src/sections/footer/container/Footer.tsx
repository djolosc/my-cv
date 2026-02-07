import { Signature } from "@/shared/components";
import styled from "styled-components";

const Footer = () => {
  return (
    <span>
      <Signature />
      <FooterWrapper>made with love</FooterWrapper>
    </span>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.s20};
  padding-bottom: ${({ theme }) => theme.spacing.s56};
  font-family: "Geist Mono", monospace;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
`;
