# Vercel Deployment Guide for Cipher Collaborate AI

This guide provides step-by-step instructions for deploying the Cipher Collaborate AI project to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `owen91o/cipher-collaborate-ai` from the list
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - In the "Environment Variables" section, add each variable from your `.env.local`:
     - `NEXT_PUBLIC_CHAIN_ID` = `11155111`
     - `NEXT_PUBLIC_RPC_URL` = `https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990`
     - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = `2ec9743d0d0cd7fb94dee1a7e6d33475`
     - `NEXT_PUBLIC_INFURA_API_KEY` = `b18fb7e6ca7045ac83c41157ab93f990`

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-5 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd cipher-collaborate-ai
   vercel
   ```

4. **Follow the CLI Prompts**
   - Link to existing project or create new one
   - Set up environment variables when prompted
   - Confirm deployment settings

## Step 3: Configure Custom Domain (Optional)

1. **Add Domain in Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Domains" tab
   - Add your custom domain

2. **Update DNS Settings**
   - Add CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation (up to 24 hours)

## Step 4: Verify Deployment

1. **Check Build Logs**
   - Ensure build completed successfully
   - Check for any warnings or errors

2. **Test Application**
   - Visit your deployed URL
   - Test wallet connection
   - Verify all features work correctly

3. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor Core Web Vitals

## Step 5: Production Optimizations

### Build Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "NEXT_PUBLIC_CHAIN_ID": "11155111",
    "NEXT_PUBLIC_RPC_URL": "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
    "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID": "2ec9743d0d0cd7fb94dee1a7e6d33475",
    "NEXT_PUBLIC_INFURA_API_KEY": "b18fb7e6ca7045ac83c41157ab93f990"
  }
}
```

### Performance Optimizations

1. **Enable Edge Functions** (if needed)
2. **Configure Caching Headers**
3. **Optimize Images and Assets**
4. **Enable Compression**

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL accessibility
   - Ensure correct chain ID

4. **Contract Interaction Failures**
   - Verify contract address is correct
   - Check network configuration
   - Ensure user has sufficient funds

### Debug Steps

1. **Check Build Logs**
   ```bash
   vercel logs [deployment-url]
   ```

2. **Local Testing**
   ```bash
   npm run build
   npm run preview
   ```

3. **Environment Variable Testing**
   - Use browser dev tools to check if variables are loaded
   - Verify in Network tab that requests are going to correct endpoints

## Security Considerations

1. **Never commit sensitive keys to repository**
2. **Use environment variables for all configuration**
3. **Enable Vercel's security features**
4. **Regular dependency updates**
5. **Monitor for security vulnerabilities**

## Monitoring and Maintenance

1. **Set up Vercel Analytics**
2. **Configure error tracking**
3. **Monitor performance metrics**
4. **Regular dependency updates**
5. **Backup important data**

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Project Issues: [github.com/owen91o/cipher-collaborate-ai/issues](https://github.com/owen91o/cipher-collaborate-ai/issues)

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Build command set to `npm run build`
- [ ] Output directory set to `dist`
- [ ] Framework preset set to Vite
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Security headers configured
- [ ] Caching strategy implemented
- [ ] CDN optimization enabled

## Post-Deployment

1. **Test all functionality**
2. **Monitor error rates**
3. **Check performance metrics**
4. **Verify wallet connections**
5. **Test contract interactions**
6. **Update documentation**
7. **Share deployment URL with team**

Your Cipher Collaborate AI application should now be successfully deployed on Vercel!
