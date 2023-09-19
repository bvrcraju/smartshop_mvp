import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler';
import path from 'path';

if (require.main === module) {
    // Called directly from command line
    customAdminUi({ recompile: true, devMode: false })
        .compile?.()
        .then(() => {
            process.exit(0);
        });
}

export function customAdminUi(options: { recompile: boolean; devMode: boolean }) {
    const compiledAppPath = path.join(__dirname, '../admin-ui');
    if (options.recompile) {
        return compileUiExtensions({
            outputPath: compiledAppPath,
            extensions: [
                setBranding({
                    // The small logo appears in the top left of the screen
                    smallLogoPath: path.join(
                      __dirname,
                      "images/ss_logo_sm.png"
                    ),
                    // The large logo is used on the login page
                    largeLogoPath: path.join(
                      __dirname,
                      "images/ss_logo_lg.png"
                    ),
                    faviconPath: path.join(__dirname, "images/favicon.ico"),
                  }),
                  {
                    globalStyles: path.join(__dirname, "smartshop-theme.scss"),
                  }
            ],
            devMode: options.devMode,
        });
    } else {
        return {
            path: path.join(compiledAppPath, 'dist'),
        };
    }
}
