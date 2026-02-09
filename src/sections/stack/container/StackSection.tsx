import { type FC } from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";

import FigmaSvg from "@/assets/logos/Figma.svg";
import ChatGPTSvg from "@/assets/logos/ChatGPT.svg";
import GitHubSvg from "@/assets/logos/GitHub.svg";
import JavaScriptSvg from "@/assets/logos/JavaScript.svg";
import JestSvg from "@/assets/logos/Jest.svg";
import NodeSvg from "@/assets/logos/Node.js.svg";
import ReactSvg from "@/assets/logos/React.svg";
import ReduxSvg from "@/assets/logos/Redux.svg";
import TypeScriptSvg from "@/assets/logos/TypeScript.svg";
import VuetifySvg from "@/assets/logos/Vuetify.svg";
import ViteSvg from "@/assets/logos/Vite.svg";
import VueSvg from "@/assets/logos/Vue.svg";
import YarnSvg from "@/assets/logos/Yarn.svg";

import Icon from "../components/Icon";
import SectionLayout from "@/sections/layout/SectionLayout";

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
      <StyledMarquee speed={20} gradient={false}>
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
  height: 90px;
  align-items: flex-start;
`;
