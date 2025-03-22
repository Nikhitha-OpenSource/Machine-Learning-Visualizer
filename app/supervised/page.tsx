'use client';

import { useState } from 'react';
import { Brain, LineChart, GitBranch } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function SupervisedLearning() {
  const algorithms = [
    {
      title: 'Linear Regression',
      description: 'Predict continuous values using linear relationships',
      icon: <LineChart className="w-8 h-8 text-purple-400" />,
      path: '/supervised/linear-regression'
    },
    {
      title: 'Decision Trees',
      description: 'Make decisions through tree-like graphs of decisions',
      icon: <GitBranch className="w-8 h-8 text-purple-400" />,
      path: '/supervised/decision-trees'
    },
    {
      title: 'Neural Networks',
      description: 'Learn complex patterns using artificial neural networks',
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      path: '/supervised/neural-networks'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-4">Supervised Learning</h1>
        <p className="text-xl text-center text-purple-300 mb-16">
          Learn how machines predict outcomes from labeled training data
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {algorithms.map((algo, index) => (
            <Link key={index} href={algo.path}>
              <Card className="h-full p-6 bg-black/50 border border-purple-500/20 hover:border-purple-500/40 
                             transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="mb-4">{algo.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{algo.title}</h3>
                <p className="text-purple-300">{algo.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}