'use client'
import React from 'react'
import Input from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardProps,
  CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Dialog, DialogContent, DialogTrigger } from './dialog'
import Link from 'next/link'

function Container ({ data }: { data: CardProps[] }) {
  const [cardsData, setCardsData] = React.useState(data)
  const [inputValue, setInputValue] = React.useState('')

  const partialNameSearch = (searchTerm: string) => {
    return setCardsData(
      data.filter(
        card =>
          card.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  const fullNameSearch = (searchTerm: string) => {
    const fullName = new RegExp(searchTerm.toLowerCase())
    return setCardsData(
      data.filter(card =>
        fullName.test(
          card.firstName.toLowerCase() + ' ' + card.lastName.toLowerCase()
        )
      )
    )
  }

  const search = (searchTerm: string) => {
    const containsSpaceRegex = / /
    const endsWithSpaceRegex = /\s$/
    if (endsWithSpaceRegex.test(searchTerm)) {
      return partialNameSearch(searchTerm.trim())
    }
    if (containsSpaceRegex.test(searchTerm)) {
      return fullNameSearch(searchTerm)
    }
    return partialNameSearch(searchTerm)
  }

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regexCharacterCheck = /^[a-zA-Z0-9]$/
    const containsSpaceRegex = / /
    if (
      !regexCharacterCheck.test(e.key) &&
      e.key != 'Backspace' &&
      !containsSpaceRegex.test(e.key)
    )
      return
    if (e.key == 'Backspace') {
      return search(inputValue.slice(0, -1))
    }
    return search(inputValue + e.key)
  }

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (!newValue) {
      setCardsData(data)
    }
  }

  return (
    <div className='grid justify-center gap-10'>
      <div className='max-w-xl mx-auto mt-12 grid justify-center'>
        <Input onKeyDown={keyDown} onChange={handleChangeEvent} />
      </div>
      {!data && (
        <div className='m-auto'>
          <div
            className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-10 justify-center'>
        {cardsData.length > 0 &&
          cardsData.map((card, i) => (
            <React.Fragment key={card.id}>
              <Card>
                <CardContent className='flex gap-2 pt-4 justify-between'>
                  <Avatar>
                    <AvatarImage
                      className='rounded-full max-h-12'
                      src={card.avatarImage}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {card.firstName + ' ' + card.lastName}
                    </CardTitle>
                    <CardDescription>{card.email}</CardDescription>
                  </div>
                  <div className='justify-end'>
                    <Dialog>
                      <DialogTrigger className='button-primary'>
                        VIEW DETAIL
                      </DialogTrigger>
                      <DialogContent className='p-12'>
                        <Card className='justify-center grid'>
                          <CardHeader className='w-full justify-center'>
                            <Avatar className='m-auto w-24 h-24'>
                              <AvatarImage
                                className='max-w-12'
                                src={card.avatarImage}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <CardTitle className='text-center pt-4'>
                              {card.firstName + ' ' + card.lastName}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className='text-center'>
                            <p>{card.email}</p>
                            <p>{card.phone}</p>
                            <p>{card.id}</p>
                          </CardContent>
                          <Link className='button-primary' href={`/${card.id}`}>
                            VIEW PROFILE
                          </Link>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}

export default Container
