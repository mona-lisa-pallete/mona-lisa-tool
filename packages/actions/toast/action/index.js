import * as core from '@monalisa-lowcode/core';

export function toast(args) {
  const {
    props
  } = args;
  core.showToast(props.msg || '-');
}