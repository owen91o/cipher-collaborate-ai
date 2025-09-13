import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Database, Zap, Lock, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { useAccount } from 'wagmi';
import DatasetCreator from '@/components/DatasetCreator';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const { address, isConnected } = useAccount();

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Cipher Collaborate AI</h1>
                <p className="text-sm text-muted-foreground">Privacy-First AI Training</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Collaborate on AI Training with
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Complete Privacy</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join the decentralized data collaboration revolution. Contribute to AI training datasets 
            using Fully Homomorphic Encryption (FHE) - your data stays encrypted throughout the entire process.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => setCurrentView('contribute')} className="bg-gradient-to-r from-primary to-secondary">
              <Database className="w-5 h-5 mr-2" />
              Contribute Dataset
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentView('explore')}>
              <Zap className="w-5 h-5 mr-2" />
              Explore Datasets
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-primary/30 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="w-6 h-6 text-primary" />
                <CardTitle>FHE Encryption</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data is encrypted using state-of-the-art Fully Homomorphic Encryption, 
                allowing computation without ever decrypting your sensitive information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-secondary/30 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-secondary" />
                <CardTitle>Decentralized</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built on blockchain technology with smart contracts ensuring transparency, 
                fairness, and community governance of the data collaboration process.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-accent/30 hover:border-accent/50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-accent" />
                <CardTitle>Rewards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Earn tokens for contributing high-quality datasets and participating in 
                AI training sessions. Your contributions are valued and rewarded.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Encrypted Datasets</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">892</div>
              <div className="text-sm text-muted-foreground">Active Contributors</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">156</div>
              <div className="text-sm text-muted-foreground">Training Sessions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Privacy Guarantee</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );

  const renderContribute = () => (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Cipher Collaborate AI</h1>
                <p className="text-sm text-muted-foreground">Privacy-First AI Training</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentView('home')}>
                Back to Home
              </Button>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Contribute Your Dataset</h2>
            <p className="text-xl text-muted-foreground">
              Share your data securely with the AI community while maintaining complete privacy
            </p>
          </div>

          {!isConnected ? (
            <Card className="text-center p-12">
              <CardContent>
                <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-6">
                  You need to connect your wallet to contribute datasets to the platform.
                </p>
                <ConnectButton />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-6 h-6 text-primary" />
                  <span>Dataset Contribution Form</span>
                </CardTitle>
                <CardDescription>
                  Fill out the form below to contribute your dataset to the AI training pool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Wallet Connected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connected as: <span className="font-mono text-foreground">{address}</span>
                  </p>
                </div>
                
                <DatasetCreator />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  const renderExplore = () => (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Cipher Collaborate AI</h1>
                <p className="text-sm text-muted-foreground">Privacy-First AI Training</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentView('home')}>
                Back to Home
              </Button>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Explore Datasets</h2>
          <p className="text-xl text-muted-foreground">
            Discover and contribute to encrypted datasets for AI training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Dataset #{i}</span>
                  <Badge variant="outline">FHE Encrypted</Badge>
                </CardTitle>
                <CardDescription>
                  Medical imaging dataset with privacy-preserved annotations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contributors:</span>
                    <span>24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality Score:</span>
                    <span>95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary">Verified</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );


  switch (currentView) {
    case 'contribute':
      return renderContribute();
    case 'explore':
      return renderExplore();
    default:
      return renderHome();
  }
};

export default Index;
