# -----------------------------------------------------------------------------
# Route 53 Domain Association (Optional)
# Enable by setting enable_custom_domain = true and providing domain_name
# -----------------------------------------------------------------------------

# Look up existing Route 53 hosted zone (if exists)
data "aws_route53_zone" "main" {
  count = var.enable_custom_domain && var.domain_name != "" ? 1 : 0
  name  = var.domain_name
}

# Associate custom domain with Amplify app
resource "aws_amplify_domain_association" "main" {
  count = var.enable_custom_domain && var.domain_name != "" ? 1 : 0

  app_id      = aws_amplify_app.histpedia.id
  domain_name = var.domain_name

  # Wait for DNS propagation
  wait_for_verification = true

  # Root domain configuration
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # www subdomain configuration
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}

# -----------------------------------------------------------------------------
# Note: Amplify automatically manages Route 53 records when using
# aws_amplify_domain_association with a hosted zone in the same account.
# Manual DNS records are only needed for external DNS providers.
# -----------------------------------------------------------------------------
