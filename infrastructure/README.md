# KotaDB GCP Infrastructure Guide

## Overview

This guide provides complete instructions for deploying KotaDB to Google Cloud Platform. KotaDB is a self-contained Rust-based codebase intelligence platform that requires minimal infrastructure.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Cloud Load      │
                    │  Balancer        │
                    │  (HTTPS/TLS)     │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Cloud Run      │
                    │  (kotadb-api)    │
                    │  - Auto-scaling  │
                    │  - 1-10 instances│
                    └──────────────────┘
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
           ┌──────────────┐     ┌──────────────┐
           │  Filestore   │     │Cloud Storage │
           │  (NFS)       │     │  (Backups)   │
           │  - Data Dir  │     │              │
           └──────────────┘     └──────────────┘
```

## Prerequisites

1. GCP Account with billing enabled
2. `gcloud` CLI installed and authenticated
3. Docker installed locally
4. Required permissions:
   - Project Editor or Owner role
   - Service Account Admin
   - Cloud Run Admin
   - Storage Admin

## Quick Start

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/jayminwest/kota-db-site
cd kota-db-site/infrastructure

# Make scripts executable
chmod +x *.sh

# Set your project ID
export PROJECT_ID="your-gcp-project-id"

# Update PROJECT_ID in scripts
sed -i "s/kotadb-production/$PROJECT_ID/g" *.sh
```

### 2. Create Infrastructure

```bash
# Run the infrastructure setup
./gcp-setup.sh

# This will:
# - Enable required APIs
# - Create Artifact Registry
# - Create Cloud Storage bucket
# - Create Filestore for persistent data
# - Set up VPC connector
# - Create service accounts
```

### 3. Deploy KotaDB

```bash
# Deploy to Cloud Run
./deploy-cloud-run.sh

# Or deploy specific version
./deploy-cloud-run.sh v1.0.0
```

### 4. Verify Deployment

```bash
# Get service URL
SERVICE_URL=$(gcloud run services describe kotadb-api \
  --region=us-central1 \
  --format="value(status.url)")

# Test health endpoint
curl $SERVICE_URL/health

# Check stats
curl $SERVICE_URL/stats
```

## Configuration

### Environment Variables

Configure in `deploy-cloud-run.sh`:

```bash
RUST_LOG=info                  # Logging level (debug, info, warn, error)
KOTADB_PORT=8080              # Server port (don't change for Cloud Run)
KOTADB_HOST=0.0.0.0           # Bind address (don't change)
KOTADB_DATA_DIR=/mnt/data     # Data directory (mounted from Filestore)
```

### Resource Allocation

Default settings in `deploy-cloud-run.sh`:

```bash
--memory=1Gi        # Memory allocation
--cpu=2             # CPU cores
--min-instances=1   # Minimum instances
--max-instances=10  # Maximum instances
--concurrency=100   # Max concurrent requests per instance
```

Adjust based on your needs:

- Small workload: 512Mi memory, 1 CPU
- Medium workload: 1Gi memory, 2 CPUs (default)
- Large workload: 2Gi memory, 4 CPUs

### Storage Options

#### Option 1: Filestore (Recommended for Production)

- Persistent NFS storage
- Shared across instances
- Automatic backups
- Tiers: BASIC_HDD (cheaper) or BASIC_SSD (faster)

#### Option 2: Cloud Storage FUSE (Alternative)

- Object storage mounted as filesystem
- Good for read-heavy workloads
- Lower cost but higher latency

#### Option 3: Persistent Disk (Single Instance)

- Attached to single Cloud Run instance
- Good for development/testing
- Cannot scale horizontally

## API Integration

### Endpoints

Once deployed, KotaDB provides these endpoints:

```bash
# Health check
GET /health

# Document operations
POST   /documents              # Create document
GET    /documents              # Search documents
GET    /documents/:id          # Get document
PUT    /documents/:id          # Update document
DELETE /documents/:id          # Delete document

# Search
GET    /documents/search       # Text search
POST   /search/semantic        # Semantic search
POST   /search/hybrid          # Hybrid search

# Monitoring
GET    /stats                  # Statistics
GET    /stats/performance      # Performance metrics
GET    /stats/resources        # Resource usage
```

### Client Integration

Python example:

```python
import requests

# Base URL from Cloud Run
base_url = "https://kotadb-api-xxxxx-uc.a.run.app"

# Create document
response = requests.post(f"{base_url}/documents", json={
    "path": "/src/main.rs",
    "title": "Main file",
    "content": "fn main() { ... }"
})

# Search
response = requests.get(f"{base_url}/documents/search", params={
    "q": "function main"
})
```

## Monitoring

### Cloud Monitoring Dashboard

Import the dashboard configuration:

```bash
# Create dashboard from config
gcloud monitoring dashboards create --config-from-file=monitoring-alerts.yaml
```

### Key Metrics

- **Request Rate**: Requests per second
- **Latency**: p50, p95, p99 response times
- **Error Rate**: 5xx errors
- **CPU Usage**: Container CPU utilization
- **Memory Usage**: Container memory utilization

### Alerts

Configure alerts for:

- Latency > 100ms (p99)
- Error rate > 5%
- CPU usage > 90%
- Memory usage > 90%
- Service unavailable

### Logging

View logs:

```bash
# Tail logs
gcloud run logs tail --service=kotadb-api --region=us-central1

# Read recent logs
gcloud run logs read --service=kotadb-api --region=us-central1 --limit=50

# Filter by severity
gcloud run logs read --service=kotadb-api --region=us-central1 \
  --filter="severity>=ERROR"
```

## Security

### Network Security

- VPC connector for private communication with Filestore
- Cloud Armor for DDoS protection (optional)
- IAP for authentication (optional)

### Service Account Permissions

Minimal required permissions:

- `roles/storage.admin` - For Cloud Storage access
- `roles/logging.logWriter` - For logging
- `roles/monitoring.metricWriter` - For metrics

### Secrets Management

```bash
# Create secret
echo -n "secret-value" | gcloud secrets create api-key --data-file=-

# Grant access to service account
gcloud secrets add-iam-policy-binding api-key \
  --member="serviceAccount:kotadb-service@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Use in Cloud Run
gcloud run services update kotadb-api \
  --update-secrets="API_KEY=api-key:latest"
```

## Backup & Recovery

### Automated Backups

Create Cloud Function for scheduled backups:

```python
import os
from google.cloud import storage
from datetime import datetime

def backup_kotadb(request):
    """Backup Filestore data to Cloud Storage"""

    # Mount points
    source = "/mnt/filestore/kotadb_data"
    bucket_name = "kotadb-backups"

    # Create timestamp
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")

    # Perform backup
    os.system(f"gsutil -m rsync -r {source} gs://{bucket_name}/backup-{timestamp}/")

    return {"status": "success", "backup": f"backup-{timestamp}"}
```

Schedule with Cloud Scheduler:

```bash
gcloud scheduler jobs create http backup-kotadb \
  --schedule="0 2 * * *" \
  --uri="https://function-url" \
  --http-method=POST
```

### Manual Backup

```bash
# Backup to Cloud Storage
gsutil -m rsync -r /mnt/data gs://kotadb-backups/manual-backup/

# Restore from backup
gsutil -m rsync -r gs://kotadb-backups/backup-20240101/ /mnt/data/
```

## Scaling Considerations

### Horizontal Scaling

- Cloud Run automatically scales 1-10 instances
- Each instance handles up to 100 concurrent requests
- Total capacity: 1000 concurrent requests

### Vertical Scaling

Increase resources per instance:

```bash
gcloud run services update kotadb-api \
  --memory=2Gi \
  --cpu=4
```

### Performance Tuning

- Use BASIC_SSD Filestore for better I/O
- Increase connection pool size for high concurrency
- Enable Cloud CDN for static assets
- Use regional Cloud Run for lower latency

## Cost Optimization

### Estimated Monthly Costs (USD)

| Service       | Configuration       | Est. Cost     |
| ------------- | ------------------- | ------------- |
| Cloud Run     | 1 instance, 1GB RAM | $50-100       |
| Filestore     | 1TB BASIC_HDD       | $204          |
| Cloud Storage | 100GB backups       | $2            |
| Network       | 100GB egress        | $12           |
| **Total**     |                     | **~$270-320** |

### Cost Reduction Tips

1. Use BASIC_HDD instead of BASIC_SSD for Filestore
2. Set `--min-instances=0` to scale to zero
3. Use Cloud Storage lifecycle policies for old backups
4. Enable Cloud CDN to reduce egress costs

## Troubleshooting

### Common Issues

1. **Service not accessible**

   ```bash
   # Check service status
   gcloud run services describe kotadb-api --region=us-central1

   # Check logs for errors
   gcloud run logs read --service=kotadb-api --region=us-central1
   ```

2. **Filestore mount issues**

   ```bash
   # Verify VPC connector
   gcloud compute networks vpc-access connectors describe kotadb-connector \
     --region=us-central1

   # Check Filestore status
   gcloud filestore instances describe kotadb-filestore --zone=us-central1-a
   ```

3. **High latency**
   - Check CPU/memory usage in Cloud Monitoring
   - Increase instance resources
   - Switch to BASIC_SSD Filestore

4. **Authentication errors**
   - Verify service account permissions
   - Check if `--allow-unauthenticated` is set

## Support

- GitHub Issues: https://github.com/jayminwest/kota-db/issues
- Documentation: https://github.com/jayminwest/kota-db#documentation
- KotaDB Community: https://github.com/jayminwest/kota-db/discussions

## Next Steps

1. Set up CI/CD pipeline with Cloud Build
2. Configure custom domain with Cloud Load Balancer
3. Enable Cloud Armor for DDoS protection
4. Set up staging environment
5. Implement blue-green deployments
