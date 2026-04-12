@echo off
echo Starting deployment to GitHub...
git add .
git commit -m "Update Lian Chen-Xi to Canva link"
git push
echo Deployment push finished. Please check Vercel dashboard.
pause
