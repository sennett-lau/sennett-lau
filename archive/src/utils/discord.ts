import axios from 'axios'

export const discordHookMessageSend = async (message: string) => {
  const url =
    'https://discord.com/api/webhooks/1189401699819986944/ENm4z6pB6LIk7E7cxWlP2kAXHQwVFdjRSaw6B5c-5IvfTMrXisScIHbUdDPCte6TAOq8'
  if (!url || !message) return

  try {
    await axios.post(url, {
      content: message,
    })

    console.log('Sending message to Discord:\n', message)
  } catch (err) {
    console.error('Error sending message to Discord:', err)
  }
}
