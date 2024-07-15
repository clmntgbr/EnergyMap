import Address from '#models/address'
import env from '#start/env'
import axios from 'axios'

export default class PositionStackApi {
  async reverse(address: Address) {
    const query = `${address.latitude},${address.longitude}`
    const url = `${env.get('POSITION_STACK_URL')}/reverse?access_key=${env.get('POSITION_STACK_KEY')}&query=${query}`

    return await axios
      .get(url)
      .catch(() => {
        return { status: false, data: null }
      })
      .then((response) => {
        if (response.data.error) {
          return { status: false, data: null }
        }
        return { status: true, data: response }
      })
  }
}
