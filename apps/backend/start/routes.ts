const StationsController = () => import('#controllers/stations_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/stations/map', [StationsController, 'getStationsMap'])
})
