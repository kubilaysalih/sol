import {observer} from 'mobx-react-lite'
import React, {FC} from 'react'
import {Text, View, ViewStyle} from 'react-native'
import {useStore} from 'store'
import tw from 'tailwind'

interface Props {
  style?: ViewStyle
}

export const GeneralWidget: FC<Props> = observer(({style}) => {
  const store = useStore()

  if (!store.ui.currentTemp && !store.ui.currentlyTrackedProject) {
    return null
  }

  return (
    <View
      style={tw.style(
        `px-6 h-8 pb-1 text-gray-200 flex-row justify-between items-center`,
        style,
      )}>
      {/* <Text style={tw`text-xs`}>🎵</Text> */}
      {/* <Image
        source={{uri: store.ui.track?.artwork}}
        style={tw`h-12 w-12 rounded-lg`}
      /> */}

      {/* {!!store.ui.track?.title ? (
        <Text style={tw`w-48`} numberOfLines={1}>
          <Text style={tw`text-xs pl-1`}>{store.ui.track?.title}</Text>{' '}
          {!!store.ui.track?.artist && (
            <Text style={tw`dark:text-gray-400 text-gray-600 text-xs`}>
              · {store.ui.track?.artist}
            </Text>
          )}
        </Text>
      ) : (
        <View style={tw`w-48`} />
      )} */}

      {!!store.ui.currentTemp ? (
        <Text>
          <Text style={tw`text-xs`}>{store.ui.currentTemp}°</Text>{' '}
          <Text style={tw`text-xs capitalize`}>
            {store.ui.nextHourForecast}
          </Text>
        </Text>
      ) : (
        <View style={tw`w-48`} />
      )}

      {!!store.ui.currentlyTrackedProject ? (
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-xs pl-1`}>
            {store.ui.currentlyTrackedProject.project.name}
          </Text>
          <Text style={tw`text-xs dark:text-gray-400 text-gray-600 pl-1`}>
            · {Math.floor(store.ui.currentlyTrackedProject.todayTime / 60)}h{' '}
            {store.ui.currentlyTrackedProject.todayTime % 60}m
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  )
})
