const StationsController = () => import('#controllers/stations_controller')
const FiltersController = () => import('#controllers/filters_controller')
const PricesController = () => import('#controllers/prices_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/api/stations/map', [StationsController, 'getStationsMap'])
  router.get('/api/station/:uuid', [StationsController, 'getStationByUuid'])
  router.get('/api/prices/:uuid/:year', [PricesController, 'getPricesByStationAndYear'])
  router.get('/api/types', [FiltersController, 'getTypes'])
  router.get('/api/services', [FiltersController, 'getServices'])
  router.get('/api/departments', [FiltersController, 'getDepartments'])
})
