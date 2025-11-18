# Vercel Deployment via GitHub Actions

This project uses GitHub Actions to control deployments to Vercel instead of Vercel's built-in Git integration.

## Setup Instructions

### 1. Disable Vercel Git Integration

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Navigate to **Settings** → **Git**
3. **Disconnect** your Git repository (this prevents Vercel from auto-deploying)

### 2. Get Required Vercel Tokens

You'll need three pieces of information from Vercel:

#### A. Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it (e.g., "GitHub Actions Deploy")
4. Set scope to **Full Account** or specific to your project
5. Copy the token (you won't see it again!)

#### B. Vercel Organization ID

Run this command in your project directory:

```bash
vercel login
vercel link
cat .vercel/project.json
```

Look for `"orgId"` in the output.

#### C. Vercel Project ID

From the same `.vercel/project.json` file, look for `"projectId"`.

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

| Secret Name         | Description                      | Example        |
| ------------------- | -------------------------------- | -------------- |
| `VERCEL_TOKEN`      | Your Vercel authentication token | `abc123xyz...` |
| `VERCEL_ORG_ID`     | Your Vercel organization/team ID | `team_abc123`  |
| `VERCEL_PROJECT_ID` | Your Vercel project ID           | `prj_xyz789`   |

### 4. How It Works

The GitHub Actions workflow (`.github/workflows/vercel-deploy.yml`) will:

- **On Pull Requests:**
  - Build and deploy to a **preview** environment
  - Comment on the PR with the preview URL
  - Run quality checks

- **On Push to Main:**
  - Build and deploy to **production**
  - Update your production URL (rushh.dev)

### 5. Deployment Process

```
Push to GitHub
    ↓
GitHub Actions triggered
    ↓
Install dependencies
    ↓
Pull Vercel environment config
    ↓
Build project artifacts
    ↓
Deploy to Vercel (preview or production)
    ↓
Comment on PR (if preview)
```

### 6. Monitoring Deployments

- **GitHub Actions:** Check the **Actions** tab in your repository
- **Vercel Dashboard:** Deployments will still appear in Vercel, but triggered by GitHub Actions
- **PR Comments:** Preview URLs will be automatically commented on PRs

### 7. Troubleshooting

**Problem:** "Error: No token found"

- **Solution:** Make sure `VERCEL_TOKEN` is set in GitHub Secrets

**Problem:** "Error: Project not found"

- **Solution:** Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct

**Problem:** "Error: Forbidden"

- **Solution:** Regenerate your Vercel token with proper permissions

### 8. Reverting to Vercel Git Integration

If you want to go back to Vercel's automatic deployments:

1. Delete the `.github/workflows/vercel-deploy.yml` file
2. Re-connect your Git repository in Vercel Settings → Git
3. Remove the GitHub Secrets (optional)

## Benefits of GitHub Actions Deployment

✅ **Full Control:** Deploy only when you want
✅ **Quality Gates:** Run tests and checks before deployment
✅ **Custom Workflows:** Add additional steps (notifications, cleanup, etc.)
✅ **Preview Comments:** Automatic PR comments with preview URLs
✅ **Unified CI/CD:** All automation in one place (GitHub Actions)

## Workflow Configuration

The workflow runs on:

- Push to `main` → Production deployment
- Pull requests to `main` → Preview deployment

You can customize this in `.github/workflows/vercel-deploy.yml` by modifying the `on:` section.
