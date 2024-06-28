import { View, Text } from 'react-native'
import React from 'react'
import CalendarSelect from '../filters/CalendarSelect'

const FilterBar = () => {
  return (
    <View>
      <Text>browse by</Text>
      <View 
      className="
        flex
        flex-row
        justify-between
      ">
        <CalendarSelect />
      </View>
    </View>
  )
}

export default FilterBar