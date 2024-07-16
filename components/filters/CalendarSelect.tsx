import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';

interface CalendarSelectProps {
  onDateChange: (date: any) => any;
}

const CalendarSelect = ({ onDateChange }: CalendarSelectProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 8,
          borderWidth: 1,
          borderRadius: 8
        }}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <Text style={{ fontSize: 16 }}>this week</Text>
        <Text>{showCalendar ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showCalendar && (
        <View style={{ marginTop: 8, padding: 16, borderWidth: 1, borderRadius: 8 }}>
          <CalendarPicker onDateChange={onDateChange} />
        </View>
      )}
    </View>
  );
};

export default CalendarSelect;
