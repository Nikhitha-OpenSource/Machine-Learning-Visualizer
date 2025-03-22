'use client';

import { useState, useEffect } from 'react';
import { Brain, Layers, Target, Pause, Play, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ReinforcementLearningPage = () => {
  const [gameState, setGameState] = useState({ position: 0, isRunning: false, episodes: 0, reward: 0, qTable: Array(5).fill({ left: 0, right: 0 }) });
  const goalPosition = 4;

  useEffect(() => {
    if (gameState.isRunning) {
      const interval = setInterval(() => {
        setGameState(prev => {
          const action = Math.random() > 0.5 ? 'right' : 'left';
          const newPosition = action === 'right' ? Math.min(prev.position + 1, goalPosition) : Math.max(prev.position - 1, 0);
          const reward = newPosition === goalPosition ? 10 : -1;
          const newEpisodes = prev.episodes + 1;
          const newQTable = [...prev.qTable];

          newQTable[prev.position] = {
            ...newQTable[prev.position],
            [action]: newQTable[prev.position][action] + 0.1 * (reward + 0.9 * Math.max(newQTable[newPosition].left, newQTable[newPosition].right) - newQTable[prev.position][action])
          };

          return {
            ...prev,
            position: newPosition,
            reward: prev.reward + reward,
            episodes: newEpisodes,
            qTable: newQTable
          };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.isRunning]);

  const resetGame = () => {
    setGameState({ position: 0, isRunning: false, episodes: 0, reward: 0, qTable: Array(5).fill({ left: 0, right: 0 }) });
  };

  return (
    <div className="w-full bg-black text-white">
      <section className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
        <Brain size={80} className="mx-auto mb-8 text-purple-400" />
        <h1 className="text-5xl font-bold text-purple-500">Reinforcement Learning</h1>
        <p className="text-xl text-purple-300">Discover how machines learn through interaction and reward</p>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center p-6">
        <Layers size={60} className="mx-auto mb-4 text-purple-400" />
        <h2 className="text-4xl font-bold text-purple-500">Key Concepts</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[{ title: "The Agent", description: "An AI that makes decisions and learns from experience", icon: "🤖" },
            { title: "The Environment", description: "The world the agent interacts with and learns from", icon: "🌍" },
            { title: "Actions", description: "Choices the agent can make to interact with its environment", icon: "⚡" },
            { title: "Rewards", description: "Feedback signals that guide the learning process", icon: "⭐" }].map((concept, i) => (
            <Card key={i} className="bg-gray-900 border-purple-700">
              <div className="p-6">
                <div className="text-4xl mb-4">{concept.icon}</div>
                <h3 className="text-xl font-bold text-purple-400">{concept.title}</h3>
                <p className="text-purple-200">{concept.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center p-6">
        <Target size={60} className="mx-auto mb-4 text-purple-400" />
        <h2 className="text-4xl font-bold text-purple-500">Interactive Demo</h2>
        <p className="text-purple-300">Watch and control an AI agent as it learns to navigate to its goal</p>

        <Card className="bg-gray-900 border-purple-700 mt-6">
          <div className="p-6 space-y-6">
            <div className="flex justify-center space-x-4">
              {Array(5).fill(0).map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 border-2 flex items-center justify-center rounded-lg ${i === goalPosition ? 'bg-purple-900/20 border-purple-400' : 'border-purple-700'} ${i === gameState.position ? 'bg-purple-800/30' : ''}`}
                >
                  {i === gameState.position ? '🤖' : i === goalPosition ? '🎯' : ''}
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => setGameState(prev => ({ ...prev, isRunning: !prev.isRunning }))} className="bg-purple-600 hover:bg-purple-500">
                {gameState.isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />} {gameState.isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button onClick={resetGame} className="border-purple-500 text-purple-300 hover:bg-purple-900">
                <RefreshCw className="mr-2" /> Reset
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black p-4 rounded-lg border border-purple-700">
                <p className="text-purple-400">Episodes</p>
                <p className="text-2xl font-bold text-purple-300">{gameState.episodes}</p>
              </div>
              <div className="bg-black p-4 rounded-lg border border-purple-700">
                <p className="text-purple-400">Total Reward</p>
                <p className="text-2xl font-bold text-purple-300">{gameState.reward}</p>
              </div>
            </div>

            <h3 className="font-semibold mt-6 text-purple-400">Q-Values Table</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black">
                  <th className="border border-purple-700 p-2 text-purple-300">Position</th>
                  <th className="border border-purple-700 p-2 text-purple-300">Left</th>
                  <th className="border border-purple-700 p-2 text-purple-300">Right</th>
                </tr>
              </thead>
              <tbody>
                {gameState.qTable.map((values, i) => (
                  <tr key={i} className="bg-black">
                    <td className="border border-purple-700 p-2 text-purple-400">{i}</td>
                    <td className="border border-purple-700 p-2 text-purple-400">{values.left.toFixed(2)}</td>
                    <td className="border border-purple-700 p-2 text-purple-400">{values.right.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ReinforcementLearningPage;