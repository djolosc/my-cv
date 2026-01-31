import { useEffect, useState } from "react";
import styled from "styled-components";

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      // Timezone offset in hours
      const tzOffset = -now.getTimezoneOffset() / 60; // getTimezoneOffset returns minutes behind UTC
      const tzSign = tzOffset >= 0 ? "+" : "-";
      const tzHours = Math.abs(Math.floor(tzOffset));
      const tzMinutes = Math.abs(now.getTimezoneOffset() % 60);

      const tzString =
        tzMinutes === 0
          ? `GMT${tzSign}${tzHours}`
          : `GMT${tzSign}${tzHours}:${tzMinutes}`;

      setTime(`${hours}:${minutes}:${seconds} ${tzString}`);
    };

    updateTime(); // initial render
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <ClockWrapper>{time}</ClockWrapper>;
};

export default Clock;

const ClockWrapper = styled.div`
  font-family: "Geist Mono", monospace;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  white-space: nowrap;
  line-height: ${({ theme }) => theme.lheight.lh16};
  letter-spacing: ${({ theme }) => theme.lspacing.ls48};
`;
