import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// Redux store
import {Provider} from 'react-redux';
import reduxStore from './src/configureStore';

// Apollo
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClient from './src/configureApollo';

// Navigation
/*import {setNavigator} from '@navigation/navigationService';
import AppNavigator from '@navigation/index';*/

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={reduxStore}>
        <SafeAreaView style={styles.container}>
          {/*<AppNavigator ref={setNavigator} />*/}
        </SafeAreaView>
      </Provider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
