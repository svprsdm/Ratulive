# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
-ignorewarnings
-dontwarn com.google.android.gms.location.**
-keep class com.google.android.gms.location.** { *; }

-dontwarn com.google.android.gms.identity.intents.**
-keep class com.google.android.gms.identity.intents.** { *; }

-dontwarn com.google.android.gms.internal.**
-keep class com.google.android.gms.internal.** { *; }

-dontwarn com.google.android.gms.maps.**
-keep class com.google.android.gms.maps.** { *; }

-dontwarn com.google.android.gms.wallet.**
-keep class com.google.android.gms.wallet.** { *; }

-dontwarn com.facebook.imagepipeline.animated.**
-dontwarn com.nimbusds.jose.crypto.**
-dontwarn com.nimbusds.jose.jwk.**

-dontwarn net.minidev.asm.**
-keep class net.minidev.asm.** { *; }

-keep class org.webrtc.** { *; }

-keepclassmembers class ai.deepar.ar.DeepAR { *; }
-keepclassmembers class ai.deepar.ar.core.videotexture.VideoTextureAndroidJava { *; }
-keep class ai.deepar.ar.core.videotexture.VideoTextureAndroidJava

-dontwarn com.red5pro.streaming.core.**
-dontwarn com.red5pro.streaming.source.**


# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
