# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------

output "amplify_app_id" {
  description = "The unique ID of the Amplify app"
  value       = aws_amplify_app.histpedia.id
}

output "amplify_app_arn" {
  description = "The ARN of the Amplify app"
  value       = aws_amplify_app.histpedia.arn
}

output "amplify_default_domain" {
  description = "The default domain for the Amplify app"
  value       = aws_amplify_app.histpedia.default_domain
}

output "amplify_production_branch_url" {
  description = "The URL of the production branch"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.histpedia.default_domain}"
}

output "amplify_webhook_url" {
  description = "The URL of the webhook for manual deployments"
  value       = aws_amplify_webhook.main.url
  sensitive   = true
}

output "custom_domain_url" {
  description = "The custom domain URL (if configured)"
  value       = var.enable_custom_domain && var.domain_name != "" ? "https://${var.domain_name}" : "Not configured"
}
