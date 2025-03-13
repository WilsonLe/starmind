#! /bin/bash
trap 'echo "Deployment interrupted by user"; exit 1' INT
set -e

echo "Remove .next directory"
rm -rf .next

echo "Remove .starmind directory"
rm -rf .starmind

echo "Reinstall"
rm -rf node_modules pnpm-lock.yaml
pnpm install

echo "Build .next"
pnpm build

echo "Ensure .starmind directory exists"
mkdir -p .starmind

echo "Move all contents of .next/standalone/ to .starmind/"
cp -r .next/standalone/. .starmind

echo "Ensure .starmind/public directory exists"
mkdir -p .starmind/public

echo "Move all contents of public/* to .starmind/public/*"
cp -r public/. .starmind/public

echo "Ensure .starmind/.next/static directory exists"
mkdir -p .starmind/.next/static

echo "Move all contents of .next/static/* to .starmind/.next/static/*"
cp -r .next/static/. .starmind/.next/static

echo "Zip .starmind to starmind.tar.gz"
tar -czvf starmind.tar.gz .starmind >/dev/null 2>&1

echo "Upload starmind.tar.gz to server"
scp starmind.tar.gz starmind:

echo "Unzip starmind.tar.gz on server"
ssh starmind 'tar -xzvf starmind.tar.gz' >/dev/null 2>&1

echo "Remove starmind.tar.gz on server"
ssh starmind 'rm starmind.tar.gz'

echo "Restart starmind service"
ssh starmind 'systemctl restart starmind'
