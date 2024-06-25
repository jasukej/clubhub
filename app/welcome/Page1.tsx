import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomePage from './WelcomePage'

const Page1 = () => {
  return (
    <WelcomePage 
        subheading="Events tailored to you"
        paragraph="Lorem ipsum whatever idk placeholder text idk idk"
        // illustration={<MyIllustrationComponent />} 
        currentPage={0}
        totalPages={3}
        nextPage="/welcome/Page2"
        isLastPage={false}
    />
  )
}

export default Page1

const styles = StyleSheet.create({})