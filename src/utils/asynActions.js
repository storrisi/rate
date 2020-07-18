export default function asyncActions(actionType = null, group = null) {
  return {
    start: (context) => ({
      type: `${actionType}/start`,
      group,
      context,
      isFetching: true,
    }),
    success: (result, context) => ({
      type: `${actionType}/success`,
      group,
      result,
      context,
      isFetching: false,
    }),
    error: (error, context) => ({
      type: `${actionType}/error`,
      group,
      error,
      context,
      isFetching: false,
    }),
  }
}
