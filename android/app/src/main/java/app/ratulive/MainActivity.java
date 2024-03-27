package app.ratulive;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

// Prevent Screenshot
import android.view.WindowManager;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RatuLive";
  }
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this);  // here 
         super.onCreate(savedInstanceState);

      //   getWindow().setFlags(
      //   WindowManager.LayoutParams.FLAG_SECURE,
      //   WindowManager.LayoutParams.FLAG_SECURE
      // );
     // getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
    }
}
