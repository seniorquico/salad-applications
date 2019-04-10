import { ProfileResource } from './models/ProfileResource'
import { Profile } from './models/Profile'

export const profileFromResource = (r: ProfileResource): Profile => ({
  id: String(r.userId),
  username: String(r.profileData.nickname),
  email: String(r.profileData.email),
  termsOfService: String(r.termsOfService),
  whatsNewVersion: String(r.whatsNewVersion),
  referred: r.isReferred !== undefined ? r.isReferred === '1' : undefined,
  trackUsage: r.trackUsage === 1 ? true : undefined, // TODO: Put this back in once we have undefined as the default r.trackUsage !== undefined ? r.trackUsage === 1 : undefined,
  tutorialComplete: r.tutorialComplete === 1,
})