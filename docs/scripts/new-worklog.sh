#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DOCS_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
WORKLOG_DIR="$DOCS_DIR/worklogs"
DATE_VALUE="${1:-$(date +%F)}"
FILE_PATH="$WORKLOG_DIR/$DATE_VALUE.md"

mkdir -p "$WORKLOG_DIR"

if [ ! -f "$FILE_PATH" ]; then
  cat <<EOF > "$FILE_PATH"
# $DATE_VALUE

## 작업 요약

EOF
fi

printf '%s\n' "$FILE_PATH"
