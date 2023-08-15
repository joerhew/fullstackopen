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
      ? <div className="notification" style={successNotificationStyle}>{message}</div>
      : <div className="notification" style={errorNotificationStyle}>{message}</div>
  )
}

export default Notification