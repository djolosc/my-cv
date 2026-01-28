import { type FC } from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";

import FigmaSvg from "../../assets/Figma.svg";
import ChatGPTSvg from "../../assets/ChatGPT.svg";
import GitHubSvg from "../../assets/GitHub.svg";
import JavaScriptSvg from "../../assets/JavaScript.svg";
import JestSvg from "../../assets/Jest.svg";
import NodeSvg from "../../assets/Node.js.svg";
import ReactSvg from "../../assets/React.svg";
import ReduxSvg from "../../assets/Redux.svg";
import TypeScriptSvg from "../../assets/TypeScript.svg";
import VuetifySvg from "../../assets/Vuetify.svg";
import ViteSvg from "../../assets/Vite.svg";
import VueSvg from "../../assets/Vue.svg";
import YarnSvg from "../../assets/Yarn.svg";
import Icon from "../Icon";
import SectionLayout from "./SectionLayout";

interface StackSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const logos = [
  { name: "ChatGPT", icon: ChatGPTSvg },
  { name: "Figma", icon: FigmaSvg, backgroundColor: "black" },
  { name: "GitHub", icon: GitHubSvg },
  { name: "JavaScript", icon: JavaScriptSvg, backgroundColor: "#f0db4f" },
  { name: "Jest", icon: JestSvg },
  { name: "Node", icon: NodeSvg },
  { name: "React / React Native", icon: ReactSvg },
  { name: "Redux", icon: ReduxSvg },
  { name: "TypeScript", icon: TypeScriptSvg, backgroundColor: "#007ACC" },
  { name: "Vite", icon: ViteSvg },
  { name: "Vue", icon: VueSvg },
  { name: "Vuetify", icon: VuetifySvg },
  { name: "Yarn", icon: YarnSvg },
];

const StackSection: FC<StackSectionProps> = ({ sectionRef }) => {
  return (
    <SectionLayout sectionRef={sectionRef} id="stack" title="STACK">
      <StyledMarquee speed={30} gradient={false} pauseOnHover pauseOnClick>
        {logos.map((logo) => (
          <Icon
            key={logo.name}
            name={logo.name}
            icon={logo.icon}
            backgroundColor={logo.backgroundColor}
          />
        ))}
      </StyledMarquee>
    </SectionLayout>
  );
};

export default StackSection;
const StyledMarquee = styled(Marquee)`
  height: 125px;
`;
