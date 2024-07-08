import Price from '#models/price'
import emitter from '@adonisjs/core/services/emitter'

emitter.on('price:create', async function ([data]) {
  Price.create({
    stationId: data.stationId,
    date: data.date,
    datetimestamp: data.datetimestamp,
    value: data.value,
    typeId: data.typeId,
  })
})
