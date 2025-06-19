'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  color: 'orange' | 'green';
}

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          z: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.7 ? 'orange' : 'green',
        });
      }
      setStars(newStars);
      setIsLoaded(true);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-black" />
      
      {/* Animated nebula effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-500/15 rounded-full blur-3xl animate-pulse-slow-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-orange-400/5 rounded-full blur-2xl animate-float" />
      </div>

      {/* Stars with trailing effects */}
      {isLoaded && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute animate-twinkle ${
                star.color === 'orange' ? 'star-orange' : 'star-green'
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.z * 0.1}s`,
                animationDuration: `${2 + star.speed}s`,
                transform: `translateZ(${star.z}px)`,
              }}
            >
              {/* Star with trailing effect */}
              <div className="relative">
                <div className={`w-full h-full rounded-full ${
                  star.color === 'orange' 
                    ? 'bg-orange-400 shadow-orange-glow' 
                    : 'bg-green-400 shadow-green-glow'
                }`} />
                <div className={`absolute inset-0 rounded-full animate-pulse ${
                  star.color === 'orange' 
                    ? 'bg-orange-300/50' 
                    : 'bg-green-300/50'
                }`} />
                {/* Trailing light effect */}
                <div className={`absolute -top-1 -left-8 w-8 h-1 ${
                  star.color === 'orange' 
                    ? 'bg-gradient-to-r from-transparent to-orange-400/80' 
                    : 'bg-gradient-to-r from-transparent to-green-400/80'
                } blur-sm animate-trail`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Central rotating gyroscope cog */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96 animate-gyroscope">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 animate-spin-slow">
            <div className="absolute top-4 left-1/2 w-2 h-8 bg-orange-400/60 rounded-full transform -translate-x-1/2" />
            <div className="absolute bottom-4 left-1/2 w-2 h-8 bg-orange-400/60 rounded-full transform -translate-x-1/2" />
            <div className="absolute left-4 top-1/2 w-8 h-2 bg-orange-400/60 rounded-full transform -translate-y-1/2" />
            <div className="absolute right-4 top-1/2 w-8 h-2 bg-orange-400/60 rounded-full transform -translate-y-1/2" />
          </div>
          
          {/* Middle ring */}
          <div className="absolute inset-8 rounded-full border-2 border-green-500/30 animate-spin-reverse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-green-400/50 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${80 + i * 2}px)`,
                }}
              />
            ))}
          </div>
          
          {/* Inner core */}
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-orange-500/20 to-green-500/20 backdrop-blur-sm animate-pulse-glow">
            <div className="absolute inset-2 rounded-full border border-orange-400/40" />
            <div className="absolute inset-4 rounded-full border border-green-400/40" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-orange-300/80 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
          </div>
          
          {/* Gyroscope rings */}
          <div className="absolute inset-12 animate-gyro-x">
            <div className="w-full h-full rounded-full border-2 border-green-400/20 transform rotate-45" />
          </div>
          <div className="absolute inset-12 animate-gyro-y">
            <div className="w-full h-full rounded-full border-2 border-orange-400/20 transform rotate-12" />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float-particle ${
              i % 3 === 0 ? 'bg-orange-400/30' : 'bg-green-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Additional glow effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/5 via-transparent to-green-950/5" />
    </div>
  );
}