#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -e|--env)
      ENV="$2"
      shift # past argument
      shift # past value
      ;;
    -c|--comp)
      COMP="$2"
      shift # past argument
      shift # past value
      ;;
    -a|--action)
      ACTION="$2"
      shift # past argument
      shift # past value
      ;;
    -i|--id)
      ID="$2"
      shift # past argument
      shift # past value
      ;;
    --default)
      DEFAULT=YES
      shift # past argument
      ;;
    *)    # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL[@]}" # restore positional parameters
