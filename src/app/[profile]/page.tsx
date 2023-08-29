import {
  CardProps,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import { getData } from '../page'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams () {
  const profiles = (await getData()) as CardProps[]
  return profiles.map(profile => ({
    id: profile.id
  }))
}

export default async function Page ({
  params
}: {
  params: { profile: string }
}) {
  const data = (await getData()) as CardProps[]
  const profile = data.find(profile => profile.id === Number(params.profile))
  return (
    <>
      <Card className='grid justify-center text-center mt-12 pt-12 relative h-full'>
        <CardContent className='m-auto'>
          {profile?.avatarImage && (
            <Image
              className=''
              src={profile.avatarImage}
              width={150}
              height={150}
              alt='avatar'
            />
          )}
        </CardContent>
        <CardHeader className='p-0'>
          <CardTitle className='text-2xl'>
            {profile?.firstName + ' ' + profile?.lastName}
          </CardTitle>
          <CardDescription className='text-2xl'></CardDescription>
        </CardHeader>
        <CardContent className='pb-12'>
          <CardDescription className='text-xl'>
            {profile?.email}
          </CardDescription>
          <CardDescription className='text-xl'>
            {profile?.phone}
          </CardDescription>
          <CardDescription className='text-xl'>{profile?.id}</CardDescription>
        </CardContent>
        <CardFooter className='flex gap-24 absolute bottom-0 left-1/2 -translate-x-1/2'>
          {Number(params.profile) > 1 ? (
            <Link href={`/${JSON.stringify(Number(params.profile) - 1)}`}>
              <CardDescription className='font-semibold'>
                Previous
              </CardDescription>
            </Link>
          ) : (
            <CardDescription className='font-semibold opacity-80 cursor-not-allowed'>
              Previous
            </CardDescription>
          )}
          {Number(params.profile) < 20 ? (
            <Link href={`/${JSON.stringify(Number(params.profile) + 1)}`}>
              <CardDescription className='font-semibold'>Next</CardDescription>
            </Link>
          ) : (
            <CardDescription className='font-semibold opacity-80 cursor-not-allowed'>
              Next
            </CardDescription>
          )}
        </CardFooter>
      </Card>
      <Link className='button-primary mt-16' href={`/`}>
        Home
      </Link>
    </>
  )
}
