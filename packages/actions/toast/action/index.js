import * as core from '@gr-davinci/core';

export function toast(args) {
  const {
    props
  } = args;
  core.showToast(props.msg || '-');
}