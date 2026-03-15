// pages/index.js
import { useState, useEffect, useRef } from 'react';
import Visualizer from '../components/Visualizer';
import playlist from '../public/playlist.json'; // we'll create this next

export default function Home() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioRef = useRef(null);

  // Pick the first song by default (safe fallback)
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      setCurrentSong(playlist[0]);
    }
  }, []);

  const startAudio = async (song) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 1024;
    }

    // For testing: use a real Suno track URL or a local file
    // In real app you'll want user-triggered play + proper CORS-enabled audio source
    const audio = new Audio(song.sunoUrl || 'https://example.com/test-audio.mp3'); // ← placeholder
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const source = audioContextRef.current.createMediaElementSource(audio);
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    try {
      await audioContextRef.current.resume();
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio play failed:', err);
    }
  };

  const togglePlay = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (currentSong) {
      startAudio(currentSong);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Full-screen visualizer background */}
      <div className="fixed inset-0 z-0">
        <Visualizer
          currentSong={currentSong}
          audioAnalyser={analyserRef.current}
          isPlaying={isPlaying}
          className="w-full h-full"
        />
      </div>

      {/* Simple overlay UI */}
      <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold mb-8 text-center drop-shadow-lg">
          Smoke Stream Nebula
        </h1>

        {currentSong ? (
          <>
            <p className="text-2xl mb-6">{currentSong.title}</p>
            <p className="text-xl mb-10 opacity-80">by {currentSong.artist || 'DJ Smoke Stream'}</p>

            <button
              onClick={togglePlay}
              className="px-10 py-5 bg-purple-600 hover:bg-purple-700 rounded-full text-2xl font-bold transition transform hover:scale-105 shadow-xl"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </>
        ) : (
          <p className="text-2xl">Loading tracks...</p>
        )}

        <p className="mt-16 text-sm opacity-60">
          Bass-reactive smoke particles • Next.js + Three.js
        </p>
      </div>
    </div>
  );
}
