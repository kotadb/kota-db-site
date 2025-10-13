#!/bin/bash

# KotaDB GCP Infrastructure Setup Script
# This script sets up all necessary GCP resources for KotaDB production deployment

set -e

# Configuration Variables
PROJECT_ID="kotadb-production"
REGION="us-central1"
ZONE="us-central1-a"
SERVICE_NAME="kotadb-api"
ARTIFACT_REGISTRY="kotadb-registry"
STORAGE_BUCKET="kotadb-data"
FILESTORE_NAME="kotadb-filestore"
FILESTORE_TIER="BASIC_HDD"  # or BASIC_SSD for better performance
FILESTORE_CAPACITY="1TB"

echo "🚀 Setting up KotaDB GCP Infrastructure"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Set the project
echo "1️⃣ Setting GCP project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "2️⃣ Enabling required GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  storage.googleapis.com \
  monitoring.googleapis.com \
  logging.googleapis.com \
  file.googleapis.com \
  compute.googleapis.com \
  secretmanager.googleapis.com

# Create Artifact Registry for Docker images
echo "3️⃣ Creating Artifact Registry..."
gcloud artifacts repositories create $ARTIFACT_REGISTRY \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker registry for KotaDB images" || echo "Registry already exists"

# Create Cloud Storage bucket for backups
echo "4️⃣ Creating Cloud Storage bucket for backups..."
gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$STORAGE_BUCKET/ || echo "Bucket already exists"

# Enable versioning for data safety
gsutil versioning set on gs://$STORAGE_BUCKET/

# Create Filestore instance for persistent data
echo "5️⃣ Creating Filestore instance for persistent storage..."
gcloud filestore instances create $FILESTORE_NAME \
  --tier=$FILESTORE_TIER \
  --file-share=name="kotadb_data",capacity=$FILESTORE_CAPACITY \
  --network=name="default" \
  --zone=$ZONE || echo "Filestore already exists"

# Get Filestore IP
FILESTORE_IP=$(gcloud filestore instances describe $FILESTORE_NAME \
  --zone=$ZONE \
  --format="value(networks[0].ipAddresses[0])")

echo "Filestore IP: $FILESTORE_IP"

# Create secrets for sensitive configuration
echo "6️⃣ Creating secrets..."
# Add any API keys or sensitive config here
# Example:
# echo -n "your-secret-value" | gcloud secrets create kotadb-api-key --data-file=-

# Create service account for Cloud Run
echo "7️⃣ Creating service account..."
gcloud iam service-accounts create kotadb-service \
  --display-name="KotaDB Service Account" || echo "Service account already exists"

# Grant necessary permissions
echo "8️⃣ Granting permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:kotadb-service@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:kotadb-service@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/logging.logWriter"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:kotadb-service@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/monitoring.metricWriter"

# Create VPC connector for Filestore access
echo "9️⃣ Creating VPC connector..."
gcloud compute networks vpc-access connectors create kotadb-connector \
  --region=$REGION \
  --subnet=default \
  --subnet-project=$PROJECT_ID \
  --min-instances=2 \
  --max-instances=10 || echo "VPC connector already exists"

echo ""
echo "✅ Infrastructure setup complete!"
echo ""
echo "Next steps:"
echo "1. Build and push Docker image to Artifact Registry"
echo "2. Deploy to Cloud Run with: ./deploy-cloud-run.sh"
echo "3. Configure monitoring alerts"
echo ""
echo "Important values:"
echo "  Filestore IP: $FILESTORE_IP"
echo "  Artifact Registry: $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY"
echo "  Service Account: kotadb-service@$PROJECT_ID.iam.gserviceaccount.com"