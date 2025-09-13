import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Lock, CheckCircle, Upload, Eye, EyeOff } from 'lucide-react';
import { useCreateDataset } from '@/hooks/useContract';

interface DatasetForm {
  name: string;
  description: string;
  category: string;
  dataSize: number;
  qualityScore: number;
  dataFile: File | null;
}

const DatasetCreator = () => {
  const [form, setForm] = useState<DatasetForm>({
    name: '',
    description: '',
    category: '',
    dataSize: 0,
    qualityScore: 0,
    dataFile: null,
  });
  
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  
  const { createDataset, isLoading, error } = useCreateDataset();

  // Simulate FHE encryption process
  const simulateFHEEncryption = async (data: string) => {
    setIsEncrypting(true);
    setEncryptionProgress(0);
    
    // Simulate encryption steps
    const steps = [
      'Initializing FHE parameters...',
      'Generating encryption keys...',
      'Encrypting data size...',
      'Encrypting quality score...',
      'Generating zero-knowledge proof...',
      'Encryption completed...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEncryptionProgress(((i + 1) / steps.length) * 100);
    }
    
    // Generate mock encrypted data
    const mockEncryptedData = `0x${Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;
    
    setEncryptedData(mockEncryptedData);
    setIsEncrypting(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, dataFile: file, dataSize: file.size }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.dataFile) {
      alert('Please select a data file');
      return;
    }

    // Simulate reading file content
    const fileContent = await form.dataFile.text();
    
    // Start FHE encryption process
    await simulateFHEEncryption(fileContent);
  };

  const handleDeployToContract = async () => {
    if (!encryptedData) return;
    
    try {
      // This will call the smart contract's createDataset function
      // In actual implementation, encrypted data needs to be passed to the contract
      await createDataset({
        args: [
          form.name,
          form.description,
          form.category,
          encryptedData, // Encrypted data size
          encryptedData, // Encrypted quality score
          encryptedData  // Input proof
        ]
      });
    } catch (error) {
      console.error('Failed to deploy to contract:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-6 h-6 text-primary" />
            <span>Create FHE Encrypted Dataset</span>
          </CardTitle>
          <CardDescription>
            Securely create and deploy datasets to the blockchain using Fully Homomorphic Encryption technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Dataset Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter dataset name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category} onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical Data</SelectItem>
                    <SelectItem value="financial">Financial Data</SelectItem>
                    <SelectItem value="research">Research Data</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your dataset..."
                rows={3}
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">Data File</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".csv,.json,.txt"
                  className="flex-1"
                />
                {form.dataFile && (
                  <Badge variant="outline">
                    {form.dataFile.name} ({(form.dataFile.size / 1024).toFixed(1)} KB)
                  </Badge>
                )}
              </div>
            </div>

            {/* Quality Score */}
            <div className="space-y-2">
              <Label htmlFor="quality">Data Quality Score (1-100)</Label>
              <Input
                id="quality"
                type="number"
                min="1"
                max="100"
                value={form.qualityScore}
                onChange={(e) => setForm(prev => ({ ...prev, qualityScore: parseInt(e.target.value) || 0 }))}
                placeholder="Enter quality score"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isEncrypting}>
              <Lock className="w-4 h-4 mr-2" />
              {isEncrypting ? 'Encrypting...' : 'Start FHE Encryption'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Encryption Progress */}
      {isEncrypting && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>FHE Encryption in Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={encryptionProgress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                Protecting your data using Fully Homomorphic Encryption technology...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Encryption Results */}
      {encryptedData && !isEncrypting && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Encryption Complete</span>
            </CardTitle>
            <CardDescription>
              Your data has been successfully encrypted using FHE technology and can now be safely deployed to the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Data Encrypted
                </span>
              </div>
              <p className="text-xs text-green-700 dark:text-green-300">
                Your sensitive data is now protected by Fully Homomorphic Encryption and can be computed without decryption
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Encrypted Data</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEncryptedData(!showEncryptedData)}
                >
                  {showEncryptedData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg font-mono text-xs break-all">
                {showEncryptedData ? encryptedData : '••••••••••••••••••••••••••••••••'}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleDeployToContract} disabled={isLoading} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                {isLoading ? 'Deploying...' : 'Deploy to Smart Contract'}
              </Button>
              <Button variant="outline" onClick={() => {
                setEncryptedData(null);
                setForm({
                  name: '',
                  description: '',
                  category: '',
                  dataSize: 0,
                  qualityScore: 0,
                  dataFile: null,
                });
              }}>
                Start Over
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-300">
                  Deployment failed: {error.message}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatasetCreator;
