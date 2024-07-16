import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/store';
import { Controller, useForm } from 'react-hook-form';
import { setPartOfAnyClubs } from '@/onboardingSlice';
import { doc, query, setDoc, where } from 'firebase/firestore/lite';
import { auth, db } from '@/config/firebase';
import OnboardingPage from './OnboardingPage';
import Input from '@/components/inputs/Input';
import { collection, getDocs } from 'firebase/firestore/lite';

const Step4 = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { partOfAnyClubs, ...onboardingData } = useSelector((state: RootState) => state.onboarding)
    const { control, handleSubmit, setValue, formState: { errors }} = useForm({
        defaultValues: {
            partOfAnyClubs,
        },
    });
    
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
      const fetchOrganizations = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'organizations'));
          const orgs = querySnapshot.docs.map(doc => doc.data().name);
          console.log(orgs)
          setOrganizations(orgs);
        } catch (error) {
          console.error('Error fetching organizations:', error);
        }
      };
  
      fetchOrganizations();
    }, []);

    useEffect(() => {
      setValue('partOfAnyClubs', selectedOrganizations);
    }, [selectedOrganizations, setValue]);

    const onBack = () => {
      router.back();
    }

    const defaultUserValues: Partial<User> = {
      bio: "",
      friends: [],
      image: "",
      pronouns: "",
      institution: "",
      favoritedEvents: [],
      registeredEvents: []
    };

    // onNext has only been updating the global state in the onboarding store
    // now we're submitting that data to firebase
    const onSubmit = async (data: { partOfAnyClubs: string[] }) => {

      try {
        const selectedOrgRefs = await Promise.all(
          selectedOrganizations.map(async (orgName) => {
            const q = query(collection(db, 'organizations'), where('name', '==', orgName));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs[0].ref;
          })
        );

        // console.log(selectedOrgRefs)
  
        dispatch(setPartOfAnyClubs(selectedOrgRefs.map(ref => ref.id)));
  
        if (!auth.currentUser) {
          router.replace('/auth');
          return;
        }
  
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
          ...onboardingData,
          execOf: selectedOrgRefs,
          ...defaultUserValues,
          uid: auth.currentUser.uid
        });
        router.replace('/(tabs)');
      } catch (error) {
        console.error("Couldn't create user.", error);
      }

    }

    const handleInputChange = (text: string) => {
      setInputValue(text);

      if (text.length > 0) {
        // console.log(organizations);
        const filteredSuggestions = organizations.filter(org => 
          org.toLowerCase().includes(text.toLowerCase())
        );

        // console.log(filteredSuggestions);

        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }

    const handleSelectOrganization = (org: string) => {
      if (!selectedOrganizations.includes(org)) {
        setSelectedOrganizations([...selectedOrganizations, org]);
        setInputValue('');
        setSuggestions([]);
      }
    }

    const handleRemoveOrganization = (org: string) => {
      setSelectedOrganizations(selectedOrganizations.filter(selected => selected !== org));
    };

    let bodyContent = (
      <View>
          <Text className="text-lg font-medium mb-2">Enter clubs you are an exec of:</Text>
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Type to search for clubs"
            className="border border-gray-400 p-2 mb-2"
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
            name="partOfAnyClubs"
            render={({ field }) => (
              <Text style={{ display: 'none' }}>
                {field.value = selectedOrganizations}
              </Text>
            )}
          />
        </View>
    )
    
  return (
    <OnboardingPage
      progress={0.97}
      heading="final touches..."
      subheading="Do you manage any clubs?"
      bodyContent={bodyContent}
      onNext={handleSubmit(onSubmit)}
      onBack={onBack}
      isFinalStep
    />
  )
}

export default Step4