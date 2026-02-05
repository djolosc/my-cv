import styled from "styled-components";

const Footer = () => {
  return <FooterWrapper>made with love</FooterWrapper>;
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.s40};
  padding-bottom: ${({ theme }) => theme.spacing.s56};
  font-family: "Geist Mono", monospace;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
`;
