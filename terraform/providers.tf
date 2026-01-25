terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Optional: Configure remote backend for state management
  # backend "s3" {
  #   bucket         = "histpedia-terraform-state"
  #   key            = "amplify/terraform.tfstate"
  #   region         = "ap-northeast-1"
  #   encrypt        = true
  #   dynamodb_table = "histpedia-terraform-lock"
  # }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Project     = "histpedia"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# Provider for ACM certificates (must be in us-east-1 for CloudFront)
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = var.aws_profile

  default_tags {
    tags = {
      Project     = "histpedia"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
