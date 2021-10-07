#! /usr/bin/env bash
set -e

python /app/pre_start.py

bash ./scripts/test.sh "$@"
