import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
import { environment } from '@env/environment';


export function configureAuth(oidcConfigService: OidcConfigService): () => Promise<any> {

  return () =>
    oidcConfigService.withConfig({
      stsServer: environment.stsServer, //'https://devkit-sts.azurewebsites.net',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: environment.clientId, //'devkit-clients-spa.pkce',
      scope: environment.scope, //'openid profile email roles app.api.employeeprofile.read', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenew: true,
      silentRenewUrl: '${window.location.origin}/silent-renew.html',
      useRefreshToken: false,
      postLoginRoute: window.location.origin,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      logLevel: 3,
      secureRoutes: environment.secureRoutes, //['https://my-second-secure-url.com/', 'https://devkit-api-employeeprofile.azurewebsites.net/api'],
    });
}

@NgModule({
  imports: [AuthModule.forRoot()],
  exports: [AuthModule],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
})
export class AuthConfigModule {}
