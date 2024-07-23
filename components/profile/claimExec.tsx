import { Keyboard, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

const claimExec = () => {
  return (
    <TouchableWithoutFeedback
      className="relative min-h-screen"
      onPress={() => {Keyboard.dismiss()}} 
      accessible={false}>
    <View>
      <Modal>
        <View>
            <View>Enter organizations you are an exec of:</View>
            
        </View>
        <View className="flex-row">
        <Text>Don't see your org here?</Text>
        <Pressable onPress={() => {}}>
            <View><Text>Add a new org</Text></View>
        </Pressable>
        </View>
      </Modal>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default claimExec

const styles = StyleSheet.create({})