import Price from '#models/price'
import emitter from '@adonisjs/core/services/emitter'

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
