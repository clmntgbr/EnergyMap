import FileSystem from '#services/file_system'
import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class GasDownloadYear extends BaseCommand {
  static commandName = 'gas:download:year'
  static description =
    'This command allow to download gas price by year from government websites & save it as JSON'

  static options: CommandOptions = {}

  years = ['2022']

  async run() {
    const fileSystem = new FileSystem()

    const gasUrl = env.get('GAS_URL_YEAR', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!gasUrl || !gasPublicPath) {
      return
    }

    for (const year of this.years) {
      const gasZip = `${year}.zip`
      const gasJson = `${year}.json`

      fileSystem.invoke(gasPublicPath, gasZip, gasUrl + year, gasJson)
    }
  }
}
