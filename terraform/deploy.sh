#!/bin/bash
# Histpedia AWS Amplify Deployment Script

set -e

echo "=== Histpedia AWS Amplify Deployment ==="
echo ""

# Check for required tools
command -v terraform >/dev/null 2>&1 || { echo "Error: terraform is required but not installed."; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "Error: aws-cli is required but not installed."; exit 1; }

# Check AWS profile
AWS_PROFILE="${AWS_PROFILE:-nzu}"
echo "Using AWS profile: $AWS_PROFILE"
aws sts get-caller-identity --profile "$AWS_PROFILE" >/dev/null 2>&1 || {
    echo "Error: Cannot authenticate with AWS profile '$AWS_PROFILE'"
    exit 1
}
echo "AWS authentication successful!"
echo ""

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ] && [ ! -f terraform.tfvars ]; then
    echo "Error: GITHUB_TOKEN environment variable is not set"
    echo ""
    echo "Please create a GitHub Personal Access Token at:"
    echo "https://github.com/settings/tokens/new"
    echo ""
    echo "Required scopes: repo, admin:repo_hook"
    echo ""
    echo "Then run one of:"
    echo "  export GITHUB_TOKEN='ghp_your_token_here'"
    echo "  ./deploy.sh"
    echo ""
    echo "Or create terraform.tfvars with:"
    echo "  github_access_token = \"ghp_your_token_here\""
    exit 1
fi

# Initialize Terraform
echo "Initializing Terraform..."
terraform init

# Plan
echo ""
echo "Planning deployment..."
if [ -n "$GITHUB_TOKEN" ]; then
    terraform plan -var="github_access_token=$GITHUB_TOKEN"
else
    terraform plan
fi

# Ask for confirmation
echo ""
read -p "Do you want to apply this plan? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Deployment cancelled."
    exit 0
fi

# Apply
echo ""
echo "Applying deployment..."
if [ -n "$GITHUB_TOKEN" ]; then
    terraform apply -var="github_access_token=$GITHUB_TOKEN" -auto-approve
else
    terraform apply -auto-approve
fi

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Your Amplify app URL:"
terraform output -raw amplify_production_branch_url
echo ""
