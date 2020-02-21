import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// Redux store
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/configureStore';

// Apollo
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClient from './src/configureApollo';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
/*import {setNavigator} from '@navigation/navigationService';*/
import AppNavigator from '@navigation/index';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView style={styles.container}>
              <AppNavigator /*ref={setNavigator}*/ />
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
