# ── Terraform S3 Remote State Backend ───────────────────────────
#
# BOOTSTRAPPING:
#   1. Comment out the backend block below.
#   2. Run: terraform init && terraform apply
#      (this creates the S3 bucket and DynamoDB table)
#   3. Uncomment the backend block.
#   4. Run: terraform init -migrate-state
#      (migrates local state to S3)
#
# terraform {
#   backend "s3" {
#     bucket         = "taskflow-terraform-state"
#     key            = "prod/terraform.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "taskflow-terraform-lock"
#     encrypt        = true
#   }
# }
