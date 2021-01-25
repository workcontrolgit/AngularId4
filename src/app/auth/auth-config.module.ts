import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';

export function configureAuth(oidcConfigService: OidcConfigService): () => Promise<any> {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://devkit-sts.azurewebsites.net',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'devkit-clients-spa.pkce',
      scope: 'openid profile email roles app.api.employeeprofile.read', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenew: true,
      silentRenewUrl: '${window.location.origin}/silent-renew.html',
      useRefreshToken: false,
      postLoginRoute: window.location.origin,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      logLevel: 3,
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
