const StationsController = () => import('#controllers/stations_controller')
const FiltersController = () => import('#controllers/filters_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/api/stations/map', [StationsController, 'getStationsMap'])
  router.get('/api/types', [FiltersController, 'getTypes'])
  router.get('/api/services', [FiltersController, 'getServices'])
  router.get('/api/regions', [FiltersController, 'getRegions'])
})
