import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import * as React from 'react';

export default function Webview({ eturl }) {
  //cosnt get_urls;

  return <WebView source={{ uri: eturl }} />;
}
