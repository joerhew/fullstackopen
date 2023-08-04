const Notification = ({ message, type }) => {
  const successNotificationStyle = {
    border: '2px solid green',
    fontSize: '1.5rem',
    color: 'green'
  }

  const errorNotificationStyle = {
    border: '2px solid red',
    fontSize: '1.5rem',
    color: 'red'
  }

  if (!message) {
    return null
  }

  return (
    type === 'success'
      ? <div style={successNotificationStyle}>{message}</div>
      : <div style={errorNotificationStyle}>{message}</div>
  )
}

export default Notification