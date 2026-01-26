import type { FC } from "react";
import styled from "styled-components";

interface CompanyNameProps {
  logo: string;
  company: string;
  noPadding?: boolean;
}

const CompanyName: FC<CompanyNameProps> = ({
  logo,
  company,
  noPadding = false,
}) => {
  return (
    <Wrapper>
      <Logo src={logo} alt={company} $noPadding={noPadding} /> {company}
    </Wrapper>
  );
};

export default CompanyName;

const Wrapper = styled.span`
  color: ${({ theme }) => theme.colors.white1};
`;

const Logo = styled.img<{ $noPadding: boolean }>`
  vertical-align: middle;
  object-fit: contain;
  height: 20px;
  width: 20px;
  object-fit: contain;
  padding: ${({ $noPadding, theme }) => ($noPadding ? "0" : theme.spacing.s2)};
  background-color: ${({ theme }) => theme.colors.white1};
  border-radius: ${({ theme }) => theme.radius.r4};
  margin-left: ${({ theme }) => theme.spacing.s4};
  margin-bottom: ${({ theme }) => theme.spacing.s2};
`;
