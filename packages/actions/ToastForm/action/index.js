function (args) {
  const {
    props
  } = args;
  core.showToast(props.msg || '-');
}