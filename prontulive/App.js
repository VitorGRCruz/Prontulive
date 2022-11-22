import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview'
import { Button } from '@rneui/base';

const App = () => {
  const [source, setSource] = useState(null);

  function Load_source() {
    setSource({ uri: '172.30.30.102/site/prontuarios/teste.pdf' });
    setTimeout(() => {
      setSource(null)
    }, 5000);
  }



  return (
<>
      <View style={{height:"0%"}}>
        <WebView source={source} />
      </View>

      <Button title="teste"
        onPress={() => {
          Load_source();
        }} />
    </>

  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
 
  }
});
