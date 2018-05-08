import Analytics from 'external/mixpanel/analytics'
class Track {
  constructor() {
    this.mixpanel = window.mixpanel
    this.setMethods()
  }
  setMethods() {
    Analytics.forEach(analytic => {
      this[analytic.title] = properties => {
        const hasRequiredProperties = analytic.args.every(arg => {
          return Object.keys(properties).includes(arg)
        })
        if (!hasRequiredProperties) {
          console.warn(
            `Call to ${analytic.title} analytic does not have all required
            properties`
          )
          return
        }
        this.mixpanel.track(analytic.title, properties);
      }
    })
  }
}
const TrackInstance = new Track();
export default TrackInstance;
