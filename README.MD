# Project: [Challenge Modak]

## Description

This project is a React Native application designed to list products, filter and sort them, and view the details of a specific product. I am currently working on implementing a native Android module in Kotlin to share a product from the application using the native system functionalities.

## Native Module Status

The native sharing module is **not functioning correctly at this time**. The main issue is that the module appears as `null` or `undefined` when attempting to access it from JavaScript via `NativeModules.SharedProduct`.

## Steps Taken to Create the Native Module

1.  **Kotlin Module Creation (`SharedProductModule.kt`):**
    The file `android/app/src/main/java/com/anonymous/TestModak/SharedProductModule.kt` was created with the following code:

    ```kotlin
    package com.anonymous.TestModak

    import android.content.Intent
    import com.facebook.react.bridge.ReactApplicationContext
    import com.facebook.react.bridge.ReactContextBaseJavaModule
    import com.facebook.react.bridge.ReactMethod

    class SharedProductModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
        override fun getName(): String {
            return "SharedProduct"
        }

        @ReactMethod
        fun shareText(textToShare: String, title: String) {
            try {
                val sendIntent = Intent().apply {
                    action = Intent.ACTION_SEND
                    putExtra(Intent.EXTRA_TEXT, textToShare)
                    putExtra(Intent.EXTRA_SUBJECT, title)
                    type = "text/plain"
                }
                val shareIntent = Intent.createChooser(sendIntent, "Share via")
                shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(shareIntent)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
    ```

2.  **Kotlin Package Creation (`SharedProductPackage.kt`):**
    The file `android/app/src/main/java/com/anonymous/TestModak/SharedProductPackage.kt` was created with the following code:

    ```kotlin
    package com.anonymous.TestModak

    import com.facebook.react.ReactPackage
    import com.facebook.react.bridge.NativeModule
    import com.facebook.react.bridge.ReactApplicationContext
    import com.facebook.react.uimanager.ViewManager
    import java.util.Collections

    class SharedProductPackage : ReactPackage {
        override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
            val modules = ArrayList<NativeModule>()
            modules.add(SharedProductModule(reactContext))
            return modules
        }

        override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<*, *>> {
            return Collections.emptyList()
        }
    }
    ```

3.  **Package Registration in `MainApplication.kt`:**
    The file `android/app/src/main/java/com/anonymous/TestModak/MainApplication.kt` was modified to register the native module package:

    ```kotlin
    package com.anonymous.TestModak

    import com.anonymous.TestModak.SharedProductPackage

    class MainApplication : Application(), ReactApplication {
        override fun getPackages(): List<ReactPackage> {
            val packages = PackageList(this).packages.toMutableList()
            packages.add(SharedProductPackage())
            return packages
        }
    }
    ```

4.  **Call from JavaScript:**
    An attempt was made to access the native module from a React Native component as follows:

    ```javascript
    import { NativeModules } from "react-native";

    const handleShare = () => {
      if (NativeModules.SharedProduct) {
        NativeModules.SharedProduct.shareText(
          "Text to share",
          "Title to share"
        );
      } else {
        console.error("SharedProduct is null");
      }
    };
    ```

## Errors Encountered

- **`TypeError: Cannot read property 'shareText' of null` (or the log "SharedProduct is null"):** This is the primary error. It indicates that `NativeModules.SharedProduct` is `null` or `undefined` in JavaScript, meaning the native module has not been linked correctly.
- **`Unable to load script. ...` (Intermittent Error):** At times, this error was experienced, suggesting potential issues with the Metro development server or the application's connection to it. However, the persistent error is the native module being `null`.

## Development Environment Information

- **Operating System:** macOS
- **React Native CLI:** 18.0.0
- **Expo CLI:** 0.22.26
- **Node.js:** v18.20.7
- **npm:** 10.8.2
- **Android Studio:** Android Studio Meerkat | 2024.3.1 Patch 1
- **Gradle:** Gradle 8.10.2
- **Device/Emulator:** Device Motorola edge 20 pro

## Additional Notes

- Multiple Gradle build cleanings have been performed (`./gradlew clean`).
- Attempts have been made to restart the Metro development server with `--reset-cache` (or `-c` in Expo).
- The correct import of the package in `MainApplication.kt` has been verified.
- The Android application has been rebuilt multiple times with `npx react-native run-android`
