import styled from "styled-components";
import AlbumArt from "@/assets/images/album-art.png";
import Spotifylogo from "@/assets/logos/spotify.svg";

const SpotifyTrackCard = () => {
  const track = {
    artist: "Harry Styles",
    name: "Aperture",
    albumArt: AlbumArt,
    trackUrl: "https://open.spotify.com/track/45Z3m6yazmAi4jZuW0tzW0",
  };

  return (
    <SpotifyTrackCardWrapper>
      <InnerWrapper>
        <CoverImg src={track.albumArt} alt="album-art"></CoverImg>
        <InfoWrapper>
          <Trackname>{track.name}</Trackname>
          <p>{track.artist}</p>
        </InfoWrapper>
      </InnerWrapper>
      <PlayWrapper>
        <p>Most replayed this month</p>
        <SpotifyLink
          href={track.trackUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Listen on Spotify{" "}
          <SpotifyImg src={Spotifylogo} alt="spotify"></SpotifyImg>
        </SpotifyLink>
      </PlayWrapper>
    </SpotifyTrackCardWrapper>
  );
};

export default SpotifyTrackCard;

const SpotifyTrackCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.black3};
  border-radius: ${({ theme }) => theme.radius.r12};
  padding: ${({ theme }) => theme.spacing.s6};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InnerWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.black8};
  border-radius: ${({ theme }) => theme.radius.r8};
  padding: ${({ theme }) => theme.spacing.s8};
  display: flex;
  gap: ${({ theme }) => theme.spacing.s16};
`;

const CoverImg = styled.img`
  width: 48px;
  height: 48px;
  padding: ${({ theme }) => theme.spacing.s2};
  background-color: black;
  border-radius: ${({ theme }) => theme.radius.r6};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Trackname = styled.p`
  color: ${({ theme }) => theme.colors.white1};
`;

const PlayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  line-height: ${({ theme }) => theme.lheight.lh16};
`;

const SpotifyImg = styled.img`
  height: 16px;
  width: 16px;
`;

const SpotifyLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s4};
`;
