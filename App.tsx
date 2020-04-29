import React, { useState } from 'react';
import { Image, ScrollView, View, Alert, Clipboard } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as faker from 'faker'

const cats = [
  'address',
  'commerce',
  'company',
  'database',
  'date',
  'finance',
  'hacker',
  'image',
  'internet',
  'lorem',
  'name',
  'phone',
  'random',
  'system'
]

const Wrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Cat = styled.TouchableOpacity`
  background: #2E3940;
  height: 70px;
  margin-bottom: 20px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`

const CatText = styled.Text`
  color: white;
  font-weight: bold;
  letter-spacing: 0.5px;
`

const SubCat = styled.TouchableOpacity`
  background: #1B282F;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const SubCatText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.25px;
`

export default function App() {
  const [selected, setSelected] = useState('')
  const [subCats, setSubCats] = useState<string[]>([])
  const [data, setData] = useState('')

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#232627', '#32373A']}>
      <Wrap>
        <Image style={{ width: 74, height: 33, marginTop: 80, marginBottom: 40 }} source={require('./assets/logo.png')} />
        <ScrollView style={{
          width: '100%',
          paddingLeft: 40,
          paddingRight: 40,
          marginBottom: 40
        }}>
          {cats.map((cat, i) => (
            <View key={i}>
              <Cat
                onPress={() => {
                  selected === cat ? setSelected('') : setSelected(cat)
                  setSubCats(Object.keys(faker[cat]))
                }}
              >
                <CatText>{cat}</CatText>
              </Cat>
              {selected === cat && (
                <ScrollView style={{
                  width: '100%',
                  paddingLeft: 40,
                  marginBottom: 40
                }}>
                  {subCats.map((subCat, i) => (
                    <SubCat key={i} onPress={() => {
                      setData(faker[cat][subCat]())
                      Alert.alert(data, null, [
                        {
                          text: 'Cancel',
                          style: 'destructive'
                        },
                        {
                          text: 'Copy',
                          onPress: () => Clipboard.setString(data),
                        },
                      ])
                    }}>
                      <SubCatText>{subCat}</SubCatText>
                    </SubCat>
                  ))}
                </ScrollView>
              )}
            </View>
          ))}
        </ScrollView>
      </Wrap>
    </LinearGradient>
  );
}