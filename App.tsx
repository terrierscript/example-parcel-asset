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
        // await Asset.loadAsync(mod)
        const asset = Asset.fromModule(mod)
        // console.log(asset.localUri)
        // if (asset.localUri) {
        //   await FileSystem.deleteAsync(asset.localUri)
        // }
        await asset.downloadAsync()
        // console.log(asset)
        // console.log(asset.hash)
        const html = await FileSystem.readAsStringAsync(asset.localUri)
        // console.log(html)
        console.log("len", html.length)
        setSource({
          // html,
          uri: asset.uri,
          baseUrl: "http://localhost"
        })
      } catch (e) {
        console.log("aa", e)
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
