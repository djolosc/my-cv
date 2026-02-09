import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import SpotifyTrackCard from './SpotifyTrackCard';
import { renderWithTheme } from '@/test/utils';


describe('SpotifyTrackCard', () => {
  it('renders track name', () => {
    renderWithTheme(<SpotifyTrackCard />);
    expect(screen.getByText('Aperture')).toBeInTheDocument();
  });

  it('renders artist name', () => {
    renderWithTheme(<SpotifyTrackCard />);
    expect(screen.getByText('Harry Styles')).toBeInTheDocument();
  });

  it('renders album art image', () => {
    const { container } = renderWithTheme(<SpotifyTrackCard />);
    const images = container.querySelectorAll('img');
    const albumArt = Array.from(images).find(img => img.getAttribute('alt') === 'album-art');
    expect(albumArt).toBeInTheDocument();
  });

  it('renders Spotify logo', () => {
    const { container } = renderWithTheme(<SpotifyTrackCard />);
    const images = container.querySelectorAll('img');
    const spotifyLogo = Array.from(images).find(img => img.getAttribute('alt') === 'spotify');
    expect(spotifyLogo).toBeInTheDocument();
  });

  it('renders "Most replayed this month" text', () => {
    renderWithTheme(<SpotifyTrackCard />);
    expect(screen.getByText('Most replayed this month')).toBeInTheDocument();
  });

  it('renders "Listen on Spotify" link', () => {
    renderWithTheme(<SpotifyTrackCard />);
    const link = screen.getByText(/Listen on Spotify/);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://open.spotify.com/track/45Z3m6yazmAi4jZuW0tzW0');
  });

  it('opens Spotify link in new tab', () => {
    const { container } = renderWithTheme(<SpotifyTrackCard />);
    const link = container.querySelector('a[href*="spotify"]');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
