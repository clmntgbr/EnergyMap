import Price from '#models/price'
import Station from '#models/station'
import emitter from '@adonisjs/core/services/emitter'
import { StationStatus } from '@energy_map/enums/station_status.js'

emitter.on('price:create', async function ([data]) {
  Price.create({
    stationId: data?.stationId,
    stationRelated: data.stationRelated,
    datetimestamp: data.datetimestamp,
    value: data.value,
    typeId: data.typeId,
  })
})

emitter.on('price:update', async function ([data]) {
  const price = await Price.findBy('id', data.priceId)
  if (!price) {
    return
  }

  price.stationId = null
  price.save()
})

emitter.on('status:update', async function ([data]) {
  const station = await Station.findBy('uuid', data.stationUuid)
  if (!station) {
    return
  }

  station.status = data.status
  station.save()
})

emitter.on('address:geocoding', async function ([data]) {
  const station = data.station
  const address = data.address

  if (!station || !address) {
    return
  }

  address.street = data.street
  address.city = data.city
  address.country = data.country
  address.latitude = data.latitude
  address.longitude = data.longitude
  address.number = data.number
  address.postalCode = data.postalCode
  address.region = data.region
  address.vicinity = data.vicinity

  station.status = StationStatus.ADDRESS_FORMATED

  station.save()
  address.save()
})
