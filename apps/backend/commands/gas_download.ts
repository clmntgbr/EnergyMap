import FileSystem from '#services/file_system'
import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class GasDownload extends BaseCommand {
  static commandName = 'gas:download'
  static description =
    'This command allow to download gas price from government websites & save it as JSON'

  static options: CommandOptions = {}

  async run() {
    const fileSystem = new FileSystem()

    const gasUrl = env.get('GAS_URL', '')
    const gasJson = env.get('GAS_JSON', '')
    const gasZip = env.get('GAS_ZIP', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!gasUrl || !gasJson || !gasZip || !gasPublicPath) {
      return
    }

    fileSystem.invoke(gasPublicPath, gasZip, gasUrl, gasJson)
  }
}
