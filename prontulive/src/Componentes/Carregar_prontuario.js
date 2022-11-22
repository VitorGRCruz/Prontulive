import React, { useState } from 'react';
import {View } from 'react-native';
import { WebView } from 'react-native-webview'


const App = () => {
  
  const [source, setSource] = useState(null);

  function Load_source() {
    setSource({ uri: '10.0.2.2/site/prontuarios/teste.pdf' });
    setTimeout(() => {
      setSource(null)
    }, 5000);
  }
  return (
    <>
      <View style={{height:"0%"}}>
        <WebView source={source} />
      </View>

    </>

  );
};

export default App;

