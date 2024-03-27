package app.ratulive;
import android.app.Application;

import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import android.content.IntentFilter;
import io.rumors.reactnativesettings.RNSettingsPackage;
import io.rumors.reactnativesettings.receivers.GpsLocationReceiver;
import io.rumors.reactnativesettings.receivers.AirplaneModeReceiver;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be auto linked yet can be added manually here, for example:
          //  packages.add(new RNSettingsPackage());
          // packages.add(new RNGoogleSigninPackage());
          new KCKeepAwakePackage();
          new ImagePickerPackage();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        } 
      };

      @Override
      public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
      }

     

      @Override
      public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        registerReceiver(new GpsLocationReceiver(), new IntentFilter("android.location.PROVIDERS_CHANGED"));
        registerReceiver(new AirplaneModeReceiver(), new IntentFilter("android.intent.action.AIRPLANE_MODE"));
      }

      /**
       * Loads Flipper in React Native templates. Call this in the onCreate method with something like
       * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
       *
       * @param context
       * @param reactInstanceManager
       */
      private static void initializeFlipper(
        Context context, ReactInstanceManager reactInstanceManager) {
          if (BuildConfig.DEBUG) {
            try {
              /*
              We use reflection here to pick up the class that initializes Flipper,
              since Flipper library is not available in release mode
              */
              Class<?> aClass = Class.forName("app.ratulive.ReactNativeFlipper");
              aClass
                  .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                  .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
              e.printStackTrace();
            } catch (NoSuchMethodException e) {
              e.printStackTrace();
            } catch (IllegalAccessException e) {
              e.printStackTrace();
            } catch (InvocationTargetException e) {
              e.printStackTrace();
            }
          }
        }
      }

    
