export function toast(args) {
  const {
    props
  } = args;
  core.showToast(props.msg || '-');
}