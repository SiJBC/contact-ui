import Container from '@/components/ui/container'

export async function getData () {
  try {
    const res = await fetch(
      'https://vhloybnwf3poctpcjw2m66uh6q0kruyq.lambda-url.ap-southeast-2.on.aws/'
    )
    if (!res.ok) {
      setTimeout(() => getData(), 10000)
    }
    return res.json()
  } catch (err) {
    console.log(err)
    return []
  }
}

async function Contact () {
  const data = await getData()
  return <Container data={data} />
}

export default Contact
