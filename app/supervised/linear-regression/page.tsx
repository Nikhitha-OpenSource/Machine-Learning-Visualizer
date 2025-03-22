'use client';

import { useState, useEffect } from 'react';
import { LineChart, Brain, Settings, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FileUpload } from '@/components/ui/file-upload';
import {
  LineChart as ReChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const LinearRegressionPage = () => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [iterations, setIterations] = useState(100);
  const [isTraining, setIsTraining] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [weights, setWeights] = useState({ w: 0, b: 0 });
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loss, setLoss] = useState([]);

  useEffect(() => {
    // Generate sample data
    const sampleData = Array.from({ length: 50 }, (_, i) => {
      const x = i / 5;
      const y = 2 * x + 1 + (Math.random() - 0.5) * 2;
      return { x, y };
    });
    setData(sampleData);
  }, []);

  const handleDataUpload = (uploadedData: any[]) => {
    // Assuming the CSV has 'x' and 'y' columns
    const processedData = uploadedData.map(row => ({
      x: Number(row.x),
      y: Number(row.y)
    }));
    
    setData(processedData);
    reset(); // Reset the model when new data is loaded
  };

  const predict = (x, w, b) => w * x + b;

  const calculateLoss = (w, b) => {
    return data.reduce((sum, point) => {
      const prediction = predict(point.x, w, b);
      return sum + Math.pow(prediction - point.y, 2);
    }, 0) / (2 * data.length);
  };

  const train = () => {
    setIsTraining(true);
    let currentW = weights.w;
    let currentB = weights.b;
    let iteration = 0;
    const lossHistory = [];

    const trainStep = () => {
      if (iteration >= iterations) {
        setIsTraining(false);
        return;
      }

      // Calculate gradients
      let dw = 0;
      let db = 0;
      data.forEach(point => {
        const prediction = predict(point.x, currentW, currentB);
        dw += (prediction - point.y) * point.x;
        db += (prediction - point.y);
      });
      dw /= data.length;
      db /= data.length;

      // Update weights
      currentW -= learningRate * dw;
      currentB -= learningRate * db;

      // Update state
      setWeights({ w: currentW, b: currentB });
      setCurrentIteration(iteration);
      lossHistory.push({
        iteration,
        loss: calculateLoss(currentW, currentB)
      });
      setLoss(lossHistory);

      // Update predictions
      const newPredictions = data.map(point => ({
        x: point.x,
        y: predict(point.x, currentW, currentB)
      }));
      setPredictions(newPredictions);

      iteration++;
      requestAnimationFrame(trainStep);
    };

    trainStep();
  };

  const reset = () => {
    setWeights({ w: 0, b: 0 });
    setCurrentIteration(0);
    setLoss([]);
    setPredictions([]);
    setIsTraining(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <LineChart className="w-12 h-12 text-purple-400 mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-purple-400">Linear Regression</h1>
            <p className="text-gray-300">Interactive visualization of linear regression training</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Data Upload */}
          <Card className="bg-gray-900 border-purple-700 p-6 md:col-span-2">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-2xl font-bold text-purple-400">Upload Training Data</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 mb-4">
                  Upload a CSV file with 'x' and 'y' columns to train the model on your own data.
                </p>
                <FileUpload onDataLoaded={handleDataUpload} />
              </div>
              <div className="flex items-center justify-center border-l border-purple-500/20 pl-8">
                <div className="text-center">
                  <p className="text-purple-400 mb-2">Current Dataset</p>
                  <p className="text-2xl font-bold text-purple-300">{data.length} points</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Training Visualization */}
          <Card className="bg-gray-900 border-purple-700 p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Training Visualization</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="x" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #666' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="scatter"
                    dataKey="y"
                    stroke="#8884d8"
                    dot={{ fill: '#8884d8' }}
                    name="Data Points"
                  />
                  {predictions.length > 0 && (
                    <Line
                      type="monotone"
                      data={predictions}
                      dataKey="y"
                      stroke="#82ca9d"
                      dot={false}
                      name="Predictions"
                    />
                  )}
                </ReChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Loss Graph */}
          <Card className="bg-gray-900 border-purple-700 p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Loss Over Time</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReChart data={loss}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="iteration" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #666' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone"
                    dataKey="loss"
                    stroke="#82ca9d"
                    dot={false}
                    name="Loss"
                  />
                </ReChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Controls */}
          <Card className="bg-gray-900 border-purple-700 p-6 md:col-span-2">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-2xl font-bold text-purple-400">Training Controls</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Learning Rate: {learningRate}
                </label>
                <Slider
                  value={[learningRate]}
                  onValueChange={([value]) => setLearningRate(value)}
                  min={0.001}
                  max={0.1}
                  step={0.001}
                  className="mb-6"
                />

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Iterations: {iterations}
                </label>
                <Slider
                  value={[iterations]}
                  onValueChange={([value]) => setIterations(value)}
                  min={10}
                  max={500}
                  step={10}
                  className="mb-6"
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black p-4 rounded-lg border border-purple-700">
                    <p className="text-purple-400">Weight (w)</p>
                    <p className="text-2xl font-bold text-purple-300">
                      {weights.w.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-purple-700">
                    <p className="text-purple-400">Bias (b)</p>
                    <p className="text-2xl font-bold text-purple-300">
                      {weights.b.toFixed(4)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={train}
                    disabled={isTraining}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {isTraining ? 'Training...' : 'Start Training'}
                  </Button>
                  <Button
                    onClick={reset}
                    className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-900"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinearRegressionPage;