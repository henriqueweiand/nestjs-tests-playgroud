#!/bin/bash -e

statusFile=/tmp/psql-status
while [[ true ]]; do
  telnet 127.0.0.1 5432 &> ${statusFile}
  status=$(grep "Connection refused" ${statusFile} | wc -l)
  echo "Status: $status"

  if [[ "${status}" -eq 1 ]]; then
    echo "PSQL not running, waiting."
    sleep 1
  else
    rm ${statusFile}
    echo "PSQL running, ready to proceed."
    break;
  fi
done
