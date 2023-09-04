export const formatDate = (timestamp) => {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const timeDiffHours = (currentTime - messageTime) / (1000 * 60 * 60);
  
    if (timeDiffHours < 24) {
      // Less than 24 hours ago, display the time
      const options = { hour: '2-digit', minute: '2-digit' };
      return messageTime.toLocaleTimeString('en-US', options);
    } else if (timeDiffHours <= 48) {
      // Between 24 and 48 hours ago, display "Yesterday"
      return 'Yesterday';
    } else {
      // More than 48 hours ago, display the date as "MM/DD/YYYY"
      const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
      return messageTime.toLocaleDateString('en-US', options);
    }
  };