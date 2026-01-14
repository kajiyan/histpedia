variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "aws_profile" {
  description = "AWS CLI profile to use"
  type        = string
  default     = "nzu"
}

variable "environment" {
  description = "Environment name (production, staging, etc.)"
  type        = string
  default     = "production"
}

variable "app_name" {
  description = "Name of the Amplify application"
  type        = string
  default     = "histpedia"
}

variable "repository_url" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/kajiyan/histpedia"
}

variable "branch_name" {
  description = "Git branch to deploy"
  type        = string
  default     = "master"
}

variable "github_access_token" {
  description = "GitHub personal access token for Amplify to access the repository"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Custom domain name (optional, e.g., histpedia.com)"
  type        = string
  default     = ""
}

variable "enable_custom_domain" {
  description = "Whether to configure custom domain with Route 53"
  type        = bool
  default     = false
}
