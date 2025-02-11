import {Picker} from '@react-native-picker/picker'
import {Assets} from 'assets'
import {Input} from 'components/Input'
import languages from 'lib/languages.json'
import {observer} from 'mobx-react-lite'
import React, {FC, useState} from 'react'
import {
  Appearance,
  Button,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'
import {useStore} from 'store'
import {FocusableWidget} from 'stores'
import tw from 'tailwind'
import {useDeviceContext} from 'twrnc'

interface Props {
  style?: ViewStyle
}

type ITEM = 'ABOUT' | 'WEATHER' | 'GENERAL' | 'TRANSLATE'

interface SelectableButtonProps extends TouchableOpacityProps {
  selected: boolean
  title: string
  style?: ViewStyle
}

const SelectableButton: FC<SelectableButtonProps> = ({
  selected,
  title,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={tw.style(
        'rounded px-2 py-1 w-full border border-transparent',
        {
          'bg-gray-200 dark:bg-highlightDark border-lightBorder dark:border-darkBorder':
            selected,
        },
        style,
      )}>
      <Text style={tw`font-medium`}>{title}</Text>
    </TouchableOpacity>
  )
}

export const SettingsWidget: FC<Props> = observer(({style}) => {
  const store = useStore()
  const colorScheme = Appearance.getColorScheme()
  useDeviceContext(tw)
  const [selected, setSelected] = useState<ITEM>('GENERAL')

  return (
    <View style={tw.style(`flex-1 flex-row`, style)}>
      <View
        style={tw`p-4 w-44 border-r border-lightBorder dark:border-darkBorder`}>
        <TouchableOpacity
          onPress={() => {
            store.ui.focusWidget(FocusableWidget.SEARCH)
          }}>
          <Text style={tw`text-lg font-medium`}>
            <Text style={tw`text-lg text-gray-500`}>←</Text>
            {'  '}Settings
          </Text>
        </TouchableOpacity>
        <View style={tw`w-full pl-4`}>
          <SelectableButton
            title="General"
            selected={selected === 'GENERAL'}
            style={tw`mt-3`}
            onPress={() => setSelected('GENERAL')}
          />
          <SelectableButton
            title="Translation"
            selected={selected === 'TRANSLATE'}
            style={tw`mt-1`}
            onPress={() => setSelected('TRANSLATE')}
          />
          <SelectableButton
            title="Weather"
            selected={selected === 'WEATHER'}
            style={tw`mt-1`}
            onPress={() => setSelected('WEATHER')}
          />
          <SelectableButton
            title="About"
            selected={selected === 'ABOUT'}
            style={tw`mt-1`}
            onPress={() => setSelected('ABOUT')}
          />
        </View>
      </View>
      {selected === 'ABOUT' && (
        <View
          style={tw`flex-1 flex-row justify-center items-center bg-white dark:bg-black bg-opacity-30`}>
          <Image
            source={Assets.Logo}
            style={tw.style(`h-32 w-32`, {
              tintColor: colorScheme === 'dark' ? 'white' : 'black',
            })}
          />
          <View style={tw`pl-3`}>
            <Text style={tw`font-thin text-3xl`}>SOL</Text>
            <Text style={tw``}>Beta Version</Text>
            <Text style={tw`text-xs pt-2`}>Oscar Franco</Text>
            <Text style={tw`text-xs`}>All rights reserved 2022</Text>
          </View>
        </View>
      )}
      {selected === 'WEATHER' && (
        <View style={tw`flex-1 p-4 bg-white dark:bg-black bg-opacity-30`}>
          <Text style={tw`font-medium text-lg`}>Weather configuration</Text>
          <Text style={tw`text-sm text-gray-700 dark:text-gray-400 pt-2`}>
            OpenWeatherMap params which allow to show local weather data
          </Text>
          <Text style={tw`pt-8`}>Api Key</Text>

          <Input
            autoFocus
            value={store.ui.weatherApiKey}
            onChangeText={store.ui.setWeatherApiKey}
            placeholder="Api key..."
            bordered
            style={tw`mt-2`}
          />

          <Text style={tw`pt-4`}>Latitude</Text>

          <Input
            value={store.ui.weatherLat}
            onChangeText={store.ui.setWeatherLat}
            placeholder="Latitude..."
            style={tw`w-full mt-2`}
            bordered
          />

          <Text style={tw`pt-4`}>Longitude</Text>

          <Input
            value={store.ui.weatherLon}
            onChangeText={store.ui.setWeatherLon}
            placeholder="Longitude..."
            style={tw`w-full mt-2`}
            bordered
          />

          {__DEV__ && (
            <Button
              title="Munich"
              onPress={() => {
                store.ui.setWeatherLat('48.1351')
                store.ui.setWeatherLon('11.5820')
              }}
            />
          )}
        </View>
      )}
      {selected === 'GENERAL' && (
        <View style={tw`flex-1 p-4 bg-white dark:bg-black bg-opacity-30`}>
          <Text style={tw`font-medium text-lg`}>General configuration</Text>
          <Text style={tw`text-sm text-gray-700 dark:text-gray-400 pt-2`}>
            Manage general settings for Sol
          </Text>

          <View style={tw`flex-row mt-8 items-center`}>
            <Text style={tw`flex-1`}>Global shortcut</Text>
            <Picker
              selectedValue={store.ui.globalShortcut}
              style={tw`w-32`}
              onValueChange={v => store.ui.setGlobalShortcut(v)}>
              <Picker.Item label="Command then space" value="command" />
              <Picker.Item label="Option then space" value="option" />
            </Picker>
          </View>
          <View style={tw`flex-row mt-3 items-center`}>
            <Text style={tw`flex-1`}>Launch at login</Text>
            <Switch
              value={store.ui.launchAtLogin}
              onValueChange={store.ui.setLaunchAtLogin}
            />
          </View>
        </View>
      )}
      {selected === 'TRANSLATE' && (
        <View style={tw`flex-1 p-4 bg-white dark:bg-black bg-opacity-30`}>
          <Text style={tw`font-medium text-lg`}>Translation</Text>
          <Text style={tw`text-sm text-gray-700 dark:text-gray-400 pt-2`}>
            Configure the languages to translate
          </Text>
          <View style={tw`flex-row items-center mt-4`}>
            <Text style={tw`flex-1`}>First language</Text>
            <Picker
              onValueChange={store.ui.setFirstTranslationLanguage}
              selectedValue={store.ui.firstTranslationLanguage}
              style={tw`w-32`}>
              {Object.values(languages).map((v, index) => {
                return <Picker.Item label={v.name} value={v.code} key={index} />
              })}
            </Picker>
          </View>
          <View style={tw`flex-row items-center mt-2`}>
            <Text style={tw`flex-1`}>Second language</Text>
            <Picker
              onValueChange={store.ui.setSecondTranslationLanguage}
              selectedValue={store.ui.secondTranslationLanguage}
              style={tw`w-32`}>
              {Object.values(languages).map((v, index) => {
                return <Picker.Item label={v.name} value={v.code} key={index} />
              })}
            </Picker>
          </View>
        </View>
      )}
    </View>
  )
})
