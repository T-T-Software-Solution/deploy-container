# Scripts

This script helps automate deployments using GitHub Actions.

## Prerequisites

1. **Node.js and Bun**
    
    Ensure [Bun](https://bun.sh/) is installed.
    
2. **Environment Variables**
    
    Copy `.env.example` to `.env` and fill in the required values.
    
    ```bash
    cp .env.example .env
    ```
    
    Update your GitHub token to the `.env` file:
    
    ```bash
    GITHUB_TOKEN=your_github_token
    ```
    
    Replace `your_github_token` with a valid GitHub Personal Access Token.
    

## Usage

Run the following command to execute the script:

```bash
bun run src/index.ts
```

## Code Overview

The `src/index.ts` script uses the GitHub API to trigger deployments via GitHub Actions.

### Code Sample

```ts
import { Octokit } from '@octokit/core';
import { deploy } from './libs/github-actions';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

await deploy(octokit, {
  repository: 'T-T-Software-Solution/gov-bkk',
  branch: 'main',
  image_name: 'govbkk/backoffice',
  image_tag: 'main',
  working_dir: './src/clients/',
  project_dir: 'apps/backoffice',
  dockerfile: './apps/backoffice/Dockerfile',
});
```