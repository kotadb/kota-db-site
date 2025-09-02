#!/bin/bash

# KotaDB Cloud Run Deployment Script
# Deploys the KotaDB API server to Google Cloud Run with persistent storage

set -e

# Configuration
PROJECT_ID="kotadb-production"
REGION="us-central1"
ZONE="us-central1-a"
SERVICE_NAME="kotadb-api"
ARTIFACT_REGISTRY="kotadb-registry"
IMAGE_NAME="kotadb"
IMAGE_TAG="${1:-latest}"
FILESTORE_NAME="kotadb-filestore"

echo "🚀 Deploying KotaDB to Cloud Run"
echo "Project: $PROJECT_ID"
echo "Service: $SERVICE_NAME"
echo "Image Tag: $IMAGE_TAG"
echo ""

# Get Filestore IP
echo "1️⃣ Getting Filestore configuration..."
FILESTORE_IP=$(gcloud filestore instances describe $FILESTORE_NAME \
  --zone=$ZONE \
  --format="value(networks[0].ipAddresses[0])")

echo "Filestore IP: $FILESTORE_IP"

# Build Docker image
echo "2️⃣ Building Docker image..."
IMAGE_URL="$REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:$IMAGE_TAG"

# Option 1: Build from existing ghcr.io image
docker pull ghcr.io/jayminwest/kota-db:latest
docker tag ghcr.io/jayminwest/kota-db:latest $IMAGE_URL

# Option 2: Build from source (if you have the KotaDB source)
# docker build -t $IMAGE_URL ../kotadb/

# Push to Artifact Registry
echo "3️⃣ Pushing image to Artifact Registry..."
docker push $IMAGE_URL

# Deploy to Cloud Run
echo "4️⃣ Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image=$IMAGE_URL \
  --region=$REGION \
  --platform=managed \
  --allow-unauthenticated \
  --service-account=kotadb-service@$PROJECT_ID.iam.gserviceaccount.com \
  --vpc-connector=kotadb-connector \
  --set-env-vars="RUST_LOG=info,KOTADB_PORT=8080,KOTADB_HOST=0.0.0.0,KOTADB_DATA_DIR=/mnt/data" \
  --memory=1Gi \
  --cpu=2 \
  --timeout=300 \
  --concurrency=100 \
  --min-instances=1 \
  --max-instances=10 \
  --port=8080 \
  --execution-environment=gen2 \
  --update-secrets="KOTADB_DATA_DIR=/mnt/data:latest" \
  --add-volume=name=kotadb-data,type=nfs,location=$FILESTORE_IP:/kotadb_data \
  --add-volume-mount=volume=kotadb-data,mount-path=/mnt/data

# Get the service URL
echo "5️⃣ Getting service URL..."
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --format="value(status.url)")

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Service URL: $SERVICE_URL"
echo ""
echo "Test the deployment:"
echo "  curl $SERVICE_URL/health"
echo "  curl $SERVICE_URL/stats"
echo ""
echo "View logs:"
echo "  gcloud run logs read --service=$SERVICE_NAME --region=$REGION"