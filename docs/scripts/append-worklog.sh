#!/bin/sh

set -eu

if [ "$#" -lt 3 ]; then
  printf 'Usage: %s <date> <status> <title> [summary]\n' "$0" >&2
  exit 1
fi

DATE_VALUE="$1"
STATUS="$2"
TITLE="$3"
SUMMARY="${4:-}"

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WORKLOG_FILE=$("$SCRIPT_DIR/new-worklog.sh" "$DATE_VALUE")
STAMP=$(date '+%Y-%m-%d %H:%M:%S %Z')

{
  printf '## [%s] %s\n\n' "$STATUS" "$TITLE"
  if [ -n "$SUMMARY" ]; then
    printf '%s\n\n' "$SUMMARY"
  fi
  printf -- '- 기록 시각: %s\n\n' "$STAMP"
} >> "$WORKLOG_FILE"

printf '%s\n' "$WORKLOG_FILE"
