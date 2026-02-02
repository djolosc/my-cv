import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FC } from "react";
import styled from "styled-components";

interface LinkItemProps {
  name: string;
  icon: IconProp | string;
  linkUrl: string;
  linkName: string;
}

const LinkItem: FC<LinkItemProps> = ({ name, icon, linkUrl, linkName }) => {
  const isExternal = linkUrl.startsWith("http");

  return (
    <StyledLinkWrapper
      href={linkUrl}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <StyledInnerLinkWrapper>
        <Name>
          {typeof icon === "string" ? (
            <SvgIcon src={icon} />
          ) : (
            <FAIcon icon={icon} />
          )}
          <p>{name}</p>
        </Name>
        <Link>
          <p>{linkName}</p>
          <ArrowIcon icon={faArrowUp} />
        </Link>
      </StyledInnerLinkWrapper>
    </StyledLinkWrapper>
  );
};

export default LinkItem;

const StyledLinkWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s8} 0;
  padding: 8px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black3};
  }
`;

const StyledInnerLinkWrapper = styled.div`
  width: 640px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s16};
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s12};
`;

const Link = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s8};
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  transform: rotate(45deg);
  margin-top: ${({ theme }) => theme.spacing.s4};
`;

const FAIcon = styled(FontAwesomeIcon)`
  height: 20px;
  width: 20px;
`;

const SvgIcon = styled.img`
  height: 20px;
  width: 20px;
`;
