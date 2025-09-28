import React from 'react';
import { useNavigate } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText';
import FaultyTerminal from '../components/FaultyTerminal';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      {/* Background Terminal Effect */}
      <div className="absolute inset-0 w-full h-full">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#c77dff"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={0.6}
        />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#c77dff]/20 hover:bg-[#c77dff]/30 text-[#c77dff] px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* 404 Text */}
        <div className="mb-8 pointer-events-auto">
          <FuzzyText 
            baseIntensity={0.2} 
            hoverIntensity={0.5} 
            enableHover={true}
            fontSize="clamp(4rem, 12vw, 12rem)"
            fontWeight={900}
            color="#ffffff"
          >
            404
          </FuzzyText>
        </div>

        {/* Coming Soon Text */}
        <div className="mt-4 pointer-events-auto">
          <FuzzyText 
            baseIntensity={0.15} 
            hoverIntensity={0.4} 
            enableHover={true}
            fontSize="clamp(1.5rem, 4vw, 4rem)"
            fontWeight={600}
            color="#ffffff"
          >
            Coming Soon!
          </FuzzyText>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
