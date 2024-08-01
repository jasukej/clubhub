import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import Button from '../Button';
import { Chip, Menu, Switch } from 'react-native-paper';
import { useUser } from '@/context/UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import { SelectList } from 'react-native-dropdown-select-list';

interface EventFormValues {
    name: string;
    applicationNeeded: boolean;
    cost: number;
    description: string;
    ended: boolean;
    field: string[];
    instagramLink: string;
    media: string;
    organizationId: string[];
    rsvpLink: string;
    startTime: Date;
    endTime: Date;
    type: string;
    venue: string;
  }

  const defaultValues: EventFormValues = {
    name: "",
    applicationNeeded: false,
    cost: 0,
    description: "",
    ended: false,
    field: [],
    instagramLink: "",
    media: "",
    organizationId: [],
    rsvpLink: "",
    startTime: new Date(),
    endTime: new Date(),
    type: "",
    venue: "",
  };

interface AddEventFormProps {
    currentUser: User;
}

const AddEventForm = ({currentUser}:AddEventFormProps) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EventFormValues>({
        defaultValues,
    });
    const [selected, setSelected] = React.useState("");

    {/* OrganizationSelect component, abstract out later */}
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    console.log(currentUser.execOf);

  useEffect(() => {
    const fetchUserOrganizations = async () => {
      if (currentUser.execOf?.length) {
        try {
          const orgQuery = query(collection(db, 'organizations'), where('__name__', 'in', currentUser.execOf));
          const querySnapshot = await getDocs(orgQuery);
          const orgs = querySnapshot.docs.map(doc => doc.data().name);
          console.log(orgs);
          setOrganizations(orgs);
        } catch (error) {
          console.error('Error fetching user organizations:', error);
        }
      }
    };
    
    fetchUserOrganizations();

  }, [currentUser]);

  useEffect(() => {
    setValue('organizationId', selectedOrganizations);
  }, [selectedOrganizations, setValue]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (text.length > 0) {
      const filteredSuggestions = organizations.filter(org => 
        org.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectOrganization = (org: string) => {
    if (!selectedOrganizations.includes(org)) {
      setSelectedOrganizations([...selectedOrganizations, org]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleRemoveOrganization = (org: string) => {
    setSelectedOrganizations(selectedOrganizations.filter(selected => selected !== org));
  };

    const onSubmit = (data: EventFormValues) => {
    console.log(data);
    };

    const eventFields = ["Technology", "Sports", "Academics", "Food", "Career", "Music", "..."];
    const eventTypes = [
        { key: '1', value: 'Conference' },
        { key: '2', value: 'Workshop' },
        { key: '3', value: 'Casual' },
        { key: '4', value: 'Party' },
        { key: '5', value: 'Networking' },
        { key: '6', value: 'Residence' },
      ];

  return (
    <ScrollView className="mb-[120px]">
        <View 
        className="
            pb-4
            flex
            flex-col
            space-y-2
        ">
        <Input
            label="Event Name"
            placeholder="Enter event name"
            control={control}
            name="name"
            rules={{ required: "Event name is required" }}
            errors={errors}
        />
        {/* OrganizationSelect */}
        <View className="pt-4">
        <Text className="text-sm font-medium mb-1">Organized by</Text>
        <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Type to search"
            className="border border-black w-full -mr-9 p-2 mb-2 rounded-md"
        />
        {suggestions.length > 0 && (
            <ScrollView className="max-h-32 border border-gray-400">
            {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => handleSelectOrganization(suggestion)}
                className="p-2"
                >
                <Text>{suggestion}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        )}
        <View>
            {selectedOrganizations.map((org, index) => (
            <View key={index} className="flex flex-row items-center my-1">
                <Text>{org}</Text>
                <TouchableOpacity onPress={() => handleRemoveOrganization(org)} className='ml-8'>
                <Text style={{ color: 'red' }}>Remove</Text>
                </TouchableOpacity>
            </View>
            ))}
        </View>
        <Controller
            control={control}
            name="organizationId"
            render={({ field }) => (
            <Text style={{ display: 'none' }}>
                {field.value = selectedOrganizations}
            </Text>
        )}
      />
        <Input
            label="Description"
            placeholder="Enter description"
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            errors={errors}
        />
        </View>
        <View className="pt-4">
            <Text className="text-sm font-medium mb-1">
                Fields
            </Text>
            <View className="flex flex-row flex-wrap max-w-[100vw]">
            {eventFields.map((field) => (
            <Controller
                key={field}
                control={control}
                name="field"
                render={({ field: { onChange, value } }) => (
                <Chip 
                    mode={'outlined'}
                    selected={value.includes(field)}
                    onPress={() => {
                    const newValue = value.includes(field)
                        ? value.filter((f) => f !== field)
                        : [...value, field];
                    onChange(newValue);
                    }}
                    style={{ marginRight: 8, marginBottom: 8 }}
                >
                    {field}
                </Chip>
                )}
            />
            ))}
            </View>
        </View>
        <View className="flex">
        <Text className="text-md mb-1">Type</Text>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <SelectList
              setSelected={(val:string) => onChange(val)}
              data={eventTypes}
              save="value"
              defaultOption={{ key: value, value: value }}
            />
          )}
        />
        </View>
        <Input
            label="Venue"
            placeholder="Enter venue (or online)"
            control={control}
            name="venue"
            errors={errors}
        />
    <View className="flex-col flex space-y-4">
    <Input
        label="Cost"
        placeholder="Enter cost"
        control={control}
        name="cost"
        rules={{ required: "Cost is required", min: 0 }}
        errors={errors}
        side
    />
    <Input
        label="Instagram Link"
        placeholder="Enter Instagram link"
        control={control}
        name="instagramLink"
        errors={errors}
        side
    />
    <Input
        label="RSVP Link"
        placeholder="Enter RSVP link"
        control={control}
        name="rsvpLink"
        errors={errors}
        side
    />
    <View className="flex flex-row justify-between items-center">
        <Text className="text-sm font-medium my-1">Application Required</Text>
        <Controller
          control={control}
          name="applicationNeeded"
          render={({ field: { onChange, value } }) => (
            <Switch color="#2F48CE" value={value} onValueChange={onChange} />
          )}
        />
      </View>
    </View>

    <Button
        variant="primary"
        label="Create Event"
        className="mt-4"
        onPress={handleSubmit(onSubmit)}
    />
    </View>
    </ScrollView>
  )
}

export default AddEventForm

const styles = StyleSheet.create({})