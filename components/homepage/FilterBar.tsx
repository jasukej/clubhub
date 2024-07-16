import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CalendarSelect from '../filters/CalendarSelect'
import FieldSelect from '../filters/FieldSelect';
import CostFilter from '../filters/CostFilter';

interface FilterBarProps {
  onDateChange: (date:any) => void;
}

const FilterBar = ({onDateChange}:FilterBarProps) => {
  return (
    <View 
    className="
      flex 
      flex-row
      justify-between
    ">
      <Text
      className="
        font-semibold
        text-sm
      ">
        browse by
      </Text>
      <View 
      className="
        flex
        flex-row
        gap-x-2
      ">
        {/* <CalendarSelect onDateChange={onDateChange} /> */}
        <FieldSelect />
        <CostFilter />
      </View>
    </View>
  )
}

export default FilterBar