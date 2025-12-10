# 🔧 FIXED - Production-Ready Deployment Guide

## ✅ Issues Fixed

1. ✅ Added `FLASK_APP=main.py` environment variable
2. ✅ Changed CMD to run `python main.py` directly
3. ✅ Fixed healthcheck to use urllib (no requests dependency)
4. ✅ Updated docker-compose.yml with correct env vars
5. ✅ Production Dockerfile now uses multi-stage build
6. ✅ Both Dockerfiles work on Mac M1/M2 chips

---

## 🚀 Step-by-Step Deployment

### Step 1: Train Model (REQUIRED - First Time Only)
```bash
cd ai-service
python train_model.py
```

**Expected Output:**
```
============================================================
TRAINING RECOMMENDATION MODEL
============================================================
✓ Model saved: /path/to/models/dataframe.pkl
✓ Model saved: /path/to/models/preprocessor.pkl
✓ Model saved: /path/to/models/tfidf_matrix.pkl
```

**Verify models exist:**
```bash
ls -lh models/*.pkl
```

---

### Step 2: Build and Run with Docker Compose
```bash
# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f
```

**Expected Output:**
```
✓ Loaded pretrained model
 * Running on http://0.0.0.0:5000
```

---

### Step 3: Verify Service is Running
```bash
# Health check
curl http://localhost:5000/

# Expected response:
# {"service":"AI Recommendation Engine","status":"healthy"}

# Test recommendation
curl -X POST http://localhost:5000/recommend \
  -H "Content-Type: application/json" \
  -d '{"query": "kindle", "top_k": 3}'
```

---

## 🐛 Troubleshooting

### Issue: Container keeps restarting
```bash
# Check logs
docker-compose logs ai-service

# Common causes:
# 1. Models not trained - Run: python train_model.py
# 2. Port 5000 in use - Change port in docker-compose.yml
# 3. Missing dependencies - Rebuild: docker-compose up --build
```

### Issue: "No pretrained model found"
```bash
# Train model first
python train_model.py

# Then restart container
docker-compose restart
```

### Issue: Permission denied on Mac M1/M2
```bash
# Build for ARM64
docker-compose build --build-arg BUILDPLATFORM=linux/arm64
```

---

## 🏭 Production Deployment

### Option 1: Use Production Dockerfile (Gunicorn)
```bash
# Build with production Dockerfile
docker build -f Dockerfile.production -t ai-recommender:prod .

# Run
docker run -d \
  --name ai-service-prod \
  -p 5000:5000 \
  -v $(pwd)/models:/app/models \
  -e FLASK_APP=main.py \
  -e FLASK_ENV=production \
  --restart unless-stopped \
  ai-recommender:prod
```

### Option 2: Update docker-compose for Production
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  ai-service:
    build:
      context: .
      dockerfile: Dockerfile.production
    container_name: ai-recommendation-service
    ports:
      - "5000:5000"
    environment:
      - FLASK_APP=main.py
      - FLASK_ENV=production
      - PYTHONUNBUFFERED=1
    volumes:
      - ./models:/app/models
    restart: unless-stopped
```

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🌐 Platform Deployment

### Railway.app

1. **Train model locally first:**
```bash
python train_model.py
```

2. **Create `railway.toml`:**
```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile.production"

[deploy]
startCommand = "gunicorn -w 4 -b 0.0.0.0:$PORT --timeout 120 main:app"
healthcheckPath = "/"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
```

3. **Deploy:**
```bash
railway login
railway init
railway up
```

4. **Upload models via Railway CLI:**
```bash
railway run python train_model.py
```

---

### Render.com

1. **Train model locally:**
```bash
python train_model.py
```

2. **Create `render.yaml`:**
```yaml
services:
  - type: web
    name: ai-recommender
    env: docker
    dockerfilePath: ./Dockerfile.production
    healthCheckPath: /
    envVars:
      - key: FLASK_APP
        value: main.py
      - key: FLASK_ENV
        value: production
      - key: PYTHONUNBUFFERED
        value: "1"
```

3. **Deploy:**
- Push to GitHub
- Connect repository in Render dashboard
- Render auto-deploys

4. **Upload models:**
- Use Render Shell to run: `python train_model.py`
- Or use persistent disk (paid plan)

---

### AWS EC2

```bash
# SSH into EC2
ssh -i key.pem ubuntu@<ec2-ip>

# Install Docker
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker ubuntu

# Clone repository
git clone <your-repo>
cd ai-service

# Train model
python3 train_model.py

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose logs -f
```

**Configure Security Group:**
- Open port 5000 in AWS Console

---

### Docker Desktop (Mac M1/M2)

```bash
# Build for ARM64
docker build --platform linux/arm64 -t ai-recommender:latest .

# Or use docker-compose (auto-detects platform)
docker-compose up --build -d

# Verify
curl http://localhost:5000/
```

---

## 📊 Verification Checklist

```bash
# 1. Check container is running
docker ps | grep ai-service

# 2. Check logs for errors
docker-compose logs ai-service | grep -i error

# 3. Test health endpoint
curl http://localhost:5000/

# 4. Test recommendation endpoint
curl -X POST http://localhost:5000/recommend \
  -H "Content-Type: application/json" \
  -d '{"query": "laptop", "top_k": 5}'

# 5. Check container stats
docker stats ai-recommendation-service

# 6. Verify models are loaded
docker exec ai-recommendation-service ls -lh models/
```

---

## 🔄 Model Updates

### Update models without rebuilding:
```bash
# Train new model
python train_model.py

# Restart container (volume-mapped)
docker-compose restart
```

### Rebuild with new models:
```bash
python train_model.py
docker-compose up --build -d
```

---

## 🧹 Cleanup Commands

```bash
# Stop and remove containers
docker-compose down

# Remove images
docker rmi ai-recommender:latest

# Clean everything
docker system prune -a --volumes
```

---

## 📝 Environment Variables Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| FLASK_APP | main.py | Tell Flask where app is defined |
| FLASK_ENV | production | Set Flask environment |
| PYTHONUNBUFFERED | 1 | Show logs in real-time |

---

## ✅ Final Verification

Run these commands to ensure everything works:

```bash
# 1. Train model
python train_model.py

# 2. Build and start
docker-compose up --build -d

# 3. Wait 10 seconds for startup
sleep 10

# 4. Test health
curl http://localhost:5000/

# 5. Test recommendation
curl -X POST http://localhost:5000/recommend \
  -H "Content-Type: application/json" \
  -d '{"query": "iphone", "top_k": 3}'

# 6. Check logs
docker-compose logs ai-service
```

**Expected Results:**
- ✅ Health endpoint returns: `{"status":"healthy"}`
- ✅ Recommendation endpoint returns JSON with results
- ✅ No errors in logs
- ✅ Container stays running (not restarting)

---

## 🎉 Success!

Your AI service is now:
- ✅ Running without restart loops
- ✅ Properly configured with FLASK_APP
- ✅ Production-ready with Gunicorn option
- ✅ Compatible with Mac M1/M2
- ✅ Deployable to Railway/Render/AWS
- ✅ Models persist via volume mapping

**Your service is production-ready! 🚀**
