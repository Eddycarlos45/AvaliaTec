import React, {Component} from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppNavigator } from './components/navigation.component';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#6265ff',
  },
};

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    )
  }
}