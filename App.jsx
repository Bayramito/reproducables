import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';

const AnimatedFLashList = Animated.createAnimatedComponent(FlashList);

// ISSUE #1 - try setting numColumns prop in Animated.FlatList
// ISSUE #2 - try  with AnimatedFlashList

const App = () => {
  const [data, setData] = useState(
    Array.from({length: 9}).map(item => ({
      id: Math.floor(Math.random() * 1000),
    })),
  );

  const renderItem = ({item, index}) => {
    return (
      <View
        key={item.id}
        onTouchEnd={() => {
          setData(data.filter(i => i.id !== item.id));
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          margin: 5,
        }}>
        <Text>{index}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <AnimatedFLashList
        centerContent
        horizontal
        contentContainerStyle={{height: 100}}
        estimatedItemSize={70}
        itemLayoutAnimation={LinearTransition.springify()}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default App;
