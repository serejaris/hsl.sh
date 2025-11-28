'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Matter from 'matter-js';
import dynamic from 'next/dynamic';

// First pair is always shown first
const firstPair = ["Искусственный интеллект", "Телеграм боты"];

// Other pairs that will be shuffled
const otherPairs = [
  ["Сайты", "Приложения"],
  ["Искусство", "Инсталляции"],
  ["Образовательные программы", "Воркшопы"],
  ["Блокчейн", "NFT-коллекции"],
];

// Shuffle function using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


const fontClasses = [
  'font-playfair',
  'font-roboto-slab',
  'font-merriweather',
  'font-lora',
  'font-crimson',
  'font-source-serif',
  'font-pt-serif',
  'font-libre-baskerville',
  'font-eb-garamond',
  'font-cormorant-garamond'
];

// Deterministic font selection based on index and word position
const getFont = (index: number, position: number) => {
  const combinedIndex = (index * 2 + position) % fontClasses.length;
  return fontClasses[combinedIndex];
};

interface FallingWord {
  domElement: HTMLDivElement;
  physicsBody: Matter.Body;
}

function WordCyclingPhysics() {
  // Create shuffled pairs once on component mount
  const [shuffledPairs] = useState(() => [firstPair, ...shuffleArray(otherPairs)]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const fallingWordsRef = useRef<FallingWord[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const selectedBodyRef = useRef<Matter.Body | null>(null);
  const mousePositionsRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const currentWordsRef = useRef<{ text: string; fontClass: string }[]>([]);
  
  // Generate deterministic fonts for each word based on current index
  const randomFonts = useMemo(() => {
    const font1 = getFont(currentIndex, 0);
    const font2 = getFont(currentIndex, 1);
    return {
      word1: font1,
      word2: font2
    };
  }, [currentIndex]);

  const word1Ref = useRef<HTMLSpanElement>(null);
  const andRef = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);

  const dropWord = useCallback((text: string, originalElement: HTMLElement | null, fontClass: string) => {
    if (!sceneRef.current || !engineRef.current || !originalElement) return;

    const rect = originalElement.getBoundingClientRect();
    const initialX = rect.left + rect.width / 2;
    const initialY = rect.top + rect.height / 2;

    const wordDiv = document.createElement('div');
    wordDiv.textContent = text;
    wordDiv.className = `falling-text absolute text-xl md:text-3xl text-white p-1 select-none whitespace-nowrap will-change-transform ${fontClass}`;
    sceneRef.current.appendChild(wordDiv);

    const wordWidth = wordDiv.offsetWidth;
    const wordHeight = wordDiv.offsetHeight;

    const physicsBody = Matter.Bodies.rectangle(
      initialX,
      initialY,
      wordWidth,
      wordHeight,
      {
        restitution: 0.5,
        friction: 0.1,
        frictionAir: 0.01,
        angle: (Math.random() - 0.5) * 0.2
      }
    );

    Matter.Composite.add(engineRef.current.world, physicsBody);

    const fallingWord: FallingWord = { domElement: wordDiv, physicsBody };
    fallingWordsRef.current.push(fallingWord);
  }, []);

  const syncDOMWithPhysics = useCallback(() => {
    fallingWordsRef.current.forEach(({ domElement, physicsBody }) => {
      const { x, y } = physicsBody.position;
      const angle = physicsBody.angle;
      domElement.style.transform = `translate(${x - domElement.offsetWidth / 2}px, ${y - domElement.offsetHeight / 2}px) rotate(${angle}rad)`;
    });
    animationFrameRef.current = requestAnimationFrame(syncDOMWithPhysics);
  }, []);

  const handleInteractionStart = useCallback((e: MouseEvent | TouchEvent) => {
    if (!engineRef.current || !sceneRef.current) return;

    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const bodies = Matter.Composite.allBodies(engineRef.current.world);
    const foundBodies = Matter.Query.point(bodies, { x: clientX, y: clientY });

    if (foundBodies.length > 0 && !foundBodies[0].isStatic) {
      selectedBodyRef.current = foundBodies[0];
      Matter.Body.setStatic(selectedBodyRef.current, true);
      mousePositionsRef.current = [{ x: clientX, y: clientY, time: Date.now() }];

      const handleMove = (e: MouseEvent | TouchEvent) => {
        if (!selectedBodyRef.current) return;
        e.preventDefault();

        const moveX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const moveY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        Matter.Body.setPosition(selectedBodyRef.current, { x: moveX, y: moveY });

        mousePositionsRef.current.push({ x: moveX, y: moveY, time: Date.now() });
        if (mousePositionsRef.current.length > 5) {
          mousePositionsRef.current.shift();
        }
      };

      const handleEnd = () => {
        if (!selectedBodyRef.current) return;

        Matter.Body.setStatic(selectedBodyRef.current, false);

        if (mousePositionsRef.current.length >= 2) {
          const recent = mousePositionsRef.current[mousePositionsRef.current.length - 1];
          const previous = mousePositionsRef.current[0];
          const dt = recent.time - previous.time;

          if (dt > 0) {
            const vx = Math.min(Math.max((recent.x - previous.x) / dt * 10, -15), 15);
            const vy = Math.min(Math.max((recent.y - previous.y) / dt * 10, -15), 15);
            Matter.Body.setVelocity(selectedBodyRef.current, { x: vx, y: vy });
            Matter.Body.setAngularVelocity(selectedBodyRef.current, (Math.random() - 0.5) * 0.1);
          }
        }

        selectedBodyRef.current = null;
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    }
  }, []);


  useEffect(() => {
    const engine = Matter.Engine.create({ gravity: { y: 1.5 } });
    engineRef.current = engine;

    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 50,
      window.innerWidth * 2,
      100,
      { isStatic: true }
    );
    Matter.Composite.add(engine.world, ground);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    animationFrameRef.current = requestAnimationFrame(syncDOMWithPhysics);

    const handleResize = () => {
      Matter.Body.setPosition(ground, {
        x: window.innerWidth / 2,
        y: window.innerHeight + 50
      });
      const newGround = Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 50,
        window.innerWidth * 2,
        100,
        { isStatic: true }
      );
      Matter.Body.setVertices(ground, newGround.vertices);
    };

    window.addEventListener('resize', handleResize);

    const cycleWords = () => {
      // Capture data of words currently on screen before they change
      const wordsToFall: { text: string; rect: DOMRect; fontClass: string }[] = [];
      
      if (word1Ref.current && currentWordsRef.current[0]) {
        wordsToFall.push({
          text: currentWordsRef.current[0].text,
          rect: word1Ref.current.getBoundingClientRect(),
          fontClass: currentWordsRef.current[0].fontClass
        });
      }
      
      if (word2Ref.current && currentWordsRef.current[1]) {
        wordsToFall.push({
          text: currentWordsRef.current[1].text,
          rect: word2Ref.current.getBoundingClientRect(),
          fontClass: currentWordsRef.current[1].fontClass
        });
      }
      
      // Make current words fall immediately
      wordsToFall.forEach(wordData => {
        // Create a temporary element to hold the position data
        const tempElement = {
          getBoundingClientRect: () => wordData.rect
        } as HTMLElement;
        dropWord(wordData.text, tempElement, wordData.fontClass);
      });
      
      // Now update the index to show new words
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % shuffledPairs.length;
        // Check if we've completed a full cycle
        if (nextIndex === 0 && prev === shuffledPairs.length - 1) {
          setHasCompletedCycle(true);
        }
        return nextIndex;
      });
    };

    // Start the cycling
    const startCycling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Use 3 seconds for first cycle, 15 seconds after completing all words
      const intervalDuration = hasCompletedCycle ? 15000 : 3000;
      intervalRef.current = setInterval(cycleWords, intervalDuration);
    };

    startCycling();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      fallingWordsRef.current.forEach(({ domElement }) => {
        domElement.remove();
      });
      fallingWordsRef.current = [];
    };
  }, [hasCompletedCycle, shuffledPairs.length, dropWord, syncDOMWithPhysics]);

  // Restart cycling with new interval when cycle completes
  useEffect(() => {
    if (!engineRef.current || !sceneRef.current) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    const cycleWords = () => {
      // Capture data of words currently on screen before they change
      const wordsToFall: { text: string; rect: DOMRect; fontClass: string }[] = [];
      
      if (word1Ref.current && currentWordsRef.current[0]) {
        wordsToFall.push({
          text: currentWordsRef.current[0].text,
          rect: word1Ref.current.getBoundingClientRect(),
          fontClass: currentWordsRef.current[0].fontClass
        });
      }
      
      if (word2Ref.current && currentWordsRef.current[1]) {
        wordsToFall.push({
          text: currentWordsRef.current[1].text,
          rect: word2Ref.current.getBoundingClientRect(),
          fontClass: currentWordsRef.current[1].fontClass
        });
      }
      
      // Make current words fall immediately
      wordsToFall.forEach(wordData => {
        // Create a temporary element to hold the position data
        const tempElement = {
          getBoundingClientRect: () => wordData.rect
        } as HTMLElement;
        dropWord(wordData.text, tempElement, wordData.fontClass);
      });
      
      // Now update the index to show new words
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % shuffledPairs.length;
        // Check if we've completed a full cycle
        if (nextIndex === 0 && prev === shuffledPairs.length - 1) {
          setHasCompletedCycle(true);
        }
        return nextIndex;
      });
    };
    
    // Use 3 seconds for first cycle, 15 seconds after completing all words
    const intervalDuration = hasCompletedCycle ? 15000 : 3000;
    intervalRef.current = setInterval(cycleWords, intervalDuration);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasCompletedCycle, shuffledPairs.length, dropWord]);

  useEffect(() => {
    const currentScene = sceneRef.current;
    if (currentScene) {
      currentScene.addEventListener('mousedown', handleInteractionStart);
      currentScene.addEventListener('touchstart', handleInteractionStart);

      return () => {
        currentScene.removeEventListener('mousedown', handleInteractionStart);
        currentScene.removeEventListener('touchstart', handleInteractionStart);
      };
    }
  }, [handleInteractionStart]);

  // Update current words reference when index or fonts change
  useEffect(() => {
    currentWordsRef.current = [
      { text: shuffledPairs[currentIndex][0], fontClass: randomFonts.word1 },
      { text: shuffledPairs[currentIndex][1], fontClass: randomFonts.word2 }
    ];
  }, [currentIndex, randomFonts, shuffledPairs]);

  const wordAnimationVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: delay }
    }),
    exit: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0 } // No visual exit - words just fall
    }
  };
  
  const andAnimationVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: delay }
    }),
    exit: { 
      opacity: 0,
      scale: 0.8, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <>
      <div ref={sceneRef} className="scene absolute inset-0 cursor-pointer z-10" />
      
      {/* Logo in upper left corner */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-30 text-xl md:text-2xl lg:text-3xl font-anonymous-pro font-bold text-white">
        хсл щ
      </div>
      
      {/* Studio info in upper right corner */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 text-right text-xs md:text-sm lg:text-base font-anonymous-pro text-white max-w-[200px] md:max-w-none">
        <div className="mb-1 md:mb-2 leading-tight">Цифровая креативная студия<br className="md:hidden" /> основанная Сережей Рисом</div>
        <a href="mailto:contact@example.com" className="hover:text-gray-300 transition-colors leading-tight">
          Нужно что-то сделать?<br className="md:hidden" /> <span className='underline'>Пишите!</span>
        </a>
      </div>
      
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pointer-events-none px-4">
        <div className="text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 font-anonymous-pro font-bold text-center">мы делаем:</div>
        
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`word1-${currentIndex}`}
              variants={wordAnimationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0}
            >
              <span ref={word1Ref} className={`inline-block text-xl md:text-3xl ${randomFonts.word1}`}>
                {shuffledPairs[currentIndex][0]}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`and-${currentIndex}`}
              variants={andAnimationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.2}
            >
              <span ref={andRef} className="inline-block px-2 text-lg md:text-2xl">
                и
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`word2-${currentIndex}`}
              variants={wordAnimationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.4}
            >
              <span ref={word2Ref} className={`inline-block text-xl md:text-3xl ${randomFonts.word2}`}>
                {shuffledPairs[currentIndex][1]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// Export as dynamic component with SSR disabled to avoid hydration issues
export default dynamic(() => Promise.resolve(WordCyclingPhysics), {
  ssr: false
});