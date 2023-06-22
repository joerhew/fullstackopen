const Notification = ({message, type}) => {
  const baseStyle = {
    fontSize: 18,
    fontFamily: 'Arial',
    color: 'navy',
    backgroundColor: 'lightgray',
    border: '2px solid black',
    padding: '0.5rem',
    margin: '0.5rem',
  }

  const types = {
    success: { ...baseStyle, color: 'green', border: '2px solid green'},
    error: { ...baseStyle, color: 'red', border: '2px solid red'},
  }

  const notificationStyle = types[type] || baseStyle;

  if (message === null) {
    return null;
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification;