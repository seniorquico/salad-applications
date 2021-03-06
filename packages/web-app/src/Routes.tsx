import { Location } from 'history'
import { Component } from 'react'
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router'
import { LoadingPage } from './components'
import { ReferralOnboardingContainer } from './modules/account-views/referral-views'
import { EmailVerificationPageContainer, LoginPageContainer, LogoutPageContainer } from './modules/auth-views'
import { ReplaceBonusModalContainer } from './modules/bonus-views'
import { EarnMenuContainer } from './modules/earn-views'
import {
  CudaErrorContainer,
  FallbackErrorContainer,
  FirewallErrorContainer,
  GenericAntiVirusErrorContainer,
  NetworkErrorContainer,
  NotCompatibleErrorContainer,
  SpecificAntiVirusErrorContainer,
  UnknownErrorContainer,
} from './modules/error-views'
import { DontLoseProgressPageContainer } from './modules/machine-views'
import { RewardDetailsContainer } from './modules/reward-views'
import { SaladPayOrderSummaryContainer } from './modules/salad-pay-views'
import { SettingsContainer } from './modules/settings-views'
import { StorefrontHomePage } from './modules/storefront-views/pages/StorefrontHomePage'
import { PrivateRoute } from './PrivateRoute'
import { getStore } from './Store'

class _Routes extends Component<RouteComponentProps> {
  store = getStore()

  render() {
    const { location } = this.props

    if (this.store.native.apiVersion < 6) {
      return (
        <Route
          render={() => <LoadingPage text="Salad Is Out of Date, Please Update to the Latest Version to Continue." />}
        />
      )
    }

    const currentLocation =
      (location.state as { currentLocation: Location | undefined } | undefined)?.currentLocation || location

    if (
      this.store.auth.isAuthenticated &&
      this.store.referral.isReferralLoaded &&
      !this.store.referral.currentReferral
    ) {
      this.store.ui.showModal('/onboarding/referral')
    }

    return (
      <>
        <Switch location={currentLocation}>
          <Route exact path="/onboarding/referral" component={ReferralOnboardingContainer} />
          <Route exact path="/errors/cuda" component={CudaErrorContainer} />
          <Route exact path="/errors/fallback" component={FallbackErrorContainer} />
          <Route exact path="/errors/network" component={NetworkErrorContainer} />
          <Route exact path="/errors/not-compatible" component={NotCompatibleErrorContainer} />
          <Route exact path="/errors/unknown" component={UnknownErrorContainer} />
          <Route exact path="/errors/anti-virus/:id" component={SpecificAntiVirusErrorContainer} />
          <Route exact path="/errors/anti-virus" component={GenericAntiVirusErrorContainer} />
          <Route exact path="/errors/firewall" component={FirewallErrorContainer} />
          <Route exact path="/bonuses/replace-bonus" component={ReplaceBonusModalContainer} />
          <Route exact path="/warnings/dont-lose-progress" component={DontLoseProgressPageContainer} />
          <Route exact path="/rewards/:id" component={RewardDetailsContainer} />
          <Redirect exact from="/whats-new" to="/" />
          <Redirect exact from="/account/summary" to="/settings/summary" />
          <Redirect exact from="/account/referrals" to="/settings/referrals" />
          <Redirect exact from="/account/reward-vault" to="/settings/reward-vault" />
          {/* SaladPay: This is stand in until we figure out iFrames, popups... */}
          <Route exact path="/salad-pay/order-summary" component={SaladPayOrderSummaryContainer} />
          <PrivateRoute
            path="/account"
            component={SettingsContainer}
            isSignedIn={this.store.auth.isAuthenticated}
            isAuthPending={this.store.auth.isAuthenticationPending}
          />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/earn" component={EarnMenuContainer} />
          <Route path="/" render={() => <StorefrontHomePage />} />
          <Redirect to="/" />
        </Switch>
        <Route path="/login" exact component={LoginPageContainer} />
        <Route path="/login/email-verification" exact component={EmailVerificationPageContainer} />
        <Route path="/logout" exact component={LogoutPageContainer} />
      </>
    )
  }
}

export const Routes = withRouter(_Routes)
