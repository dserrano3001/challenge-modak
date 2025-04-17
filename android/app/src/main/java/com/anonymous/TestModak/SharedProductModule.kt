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