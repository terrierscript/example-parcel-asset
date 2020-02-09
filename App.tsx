import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native"
import { WebView } from "react-native-webview"
import { Asset } from "expo-asset"
import { AppLoading } from "expo"
import * as FileSystem from "expo-file-system"

export default function App() {
  const [source, setSource] = useState()
  useEffect(() => {
    ;(async () => {
      try {
        const mod = require("./assets/webview/index.html")
        const asset = Asset.fromModule(mod)
        await asset.downloadAsync()
        const html = await FileSystem.readAsStringAsync(asset.localUri)
        setSource({
          html,
          baseUrl: "http://localhost"
        })
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {source ? (
        <WebView
          source={source}
          style={{
            flex: 1,
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width
          }}
        />
      ) : (
        <AppLoading />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
