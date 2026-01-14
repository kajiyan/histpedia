# -----------------------------------------------------------------------------
# AWS Amplify App
# -----------------------------------------------------------------------------
resource "aws_amplify_app" "histpedia" {
  name       = var.app_name
  repository = var.repository_url

  # GitHub access token for repository access
  access_token = var.github_access_token

  # Build settings
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run app:build
      artifacts:
        baseDirectory: packages/histpedia-app/out
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - packages/histpedia-app/node_modules/**/*
  EOT

  # Custom rules for SPA routing
  # /wiki/<title>/ へのアクセスを /wiki/[titles]/index.html にリライト
  custom_rule {
    source = "/wiki/<*>"
    status = "200"
    target = "/wiki/[titles]/index.html"
  }

  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }

  # Platform configuration
  platform = "WEB"

  # Environment variables
  environment_variables = {
    NODE_ENV = "production"
    # Add any other environment variables here
  }

  # Enable auto branch creation (optional)
  enable_auto_branch_creation = false
  enable_branch_auto_build    = true
  enable_branch_auto_deletion = false
}

# -----------------------------------------------------------------------------
# Amplify Branch (Production)
# -----------------------------------------------------------------------------
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.histpedia.id
  branch_name = var.branch_name

  # Framework configuration
  framework = "Next.js - SSG"

  # Enable auto build on push
  enable_auto_build = true

  # Stage configuration
  stage = "PRODUCTION"

  # Environment variables specific to this branch
  environment_variables = {
    AMPLIFY_DIFF_DEPLOY       = "false"
    AMPLIFY_MONOREPO_APP_ROOT = "packages/histpedia-app"
  }
}

# -----------------------------------------------------------------------------
# Amplify Webhook (for manual deployments if needed)
# -----------------------------------------------------------------------------
resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.histpedia.id
  branch_name = aws_amplify_branch.main.branch_name
  description = "Webhook for manual deployments"
}
