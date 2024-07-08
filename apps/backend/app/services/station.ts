export default class StationService {
  reduce(data: any) {
    const json = {
      data: data.$,
      address: this.escape(data.adresse.shift() ?? ''),
      city: this.escape(data.ville.shift() ?? ''),
      times: data.horaires,
      services: data.services,
    }

    return JSON.stringify(json)
  }

  escape(string: string) {
    return string.replace('Ã', 'E').replace('', '')
  }
}
