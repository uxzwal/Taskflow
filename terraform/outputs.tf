output "instance_public_ip" {
  description = "Public IP of the TaskFlow EC2 instance"
  value       = aws_instance.taskflow.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of the TaskFlow EC2 instance"
  value       = aws_instance.taskflow.public_dns
}

output "security_group_id" {
  description = "ID of the TaskFlow security group"
  value       = aws_security_group.taskflow.id
}

output "s3_bucket_arn" {
  description = "ARN of the Terraform state S3 bucket"
  value       = aws_s3_bucket.terraform_state.arn
}
