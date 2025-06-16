#!/bin/sh
#   Use this script to test if a given TCP host/port are available
#
#   Usage:
#     ./wait-for-it.sh host:port [-s] [-t timeout] [-- command args]
#
#   Examples:
#     ./wait-for-it.sh google.com:80 -- echo "google is up"
#     ./wait-for-it.sh localhost:3306 -- echo "mysql is up"
#
#   See https://github.com/vishnubob/wait-for-it for the full script and documentation

set -e

TIMEOUT=15
QUIET=0
HOST=""
PORT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -q|--quiet)
      QUIET=1
      shift
      ;;
    -t|--timeout)
      TIMEOUT="$2"
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      if [[ -z "$HOST" ]]; then
        HOST=$(echo $1 | cut -d: -f1)
        PORT=$(echo $1 | cut -d: -f2)
      fi
      shift
      ;;
  esac
done

if [[ -z "$HOST" || -z "$PORT" ]]; then
  echo "Error: you need to provide host:port to test."
  exit 1
fi

for i in $(seq $TIMEOUT); do
  if nc -z "$HOST" "$PORT"; then
    [[ $QUIET -ne 1 ]] && echo "$HOST:$PORT is available!"
    exec "$@"
    exit 0
  fi
  sleep 1
done

[[ $QUIET -ne 1 ]] && echo "Timeout after $TIMEOUT seconds waiting for $HOST:$PORT."
exit 1
