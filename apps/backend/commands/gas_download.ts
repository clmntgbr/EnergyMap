import FileSystem from '#services/file_system'
import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { promises as fs } from 'node:fs'

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

    fileSystem.delete(gasPublicPath, gasZip)
    fileSystem.delete(gasPublicPath, gasJson)
    fileSystem.delete('', fileSystem.find(gasPublicPath, new RegExp('\\.xml$', 'i')))

    await fileSystem.download(gasUrl, gasZip, gasPublicPath)

    if (!fileSystem.exist(gasPublicPath, gasZip)) {
      return
    }

    await fileSystem.unzip(`${gasPublicPath}/${gasZip}`, gasPublicPath)

    const xmlFile = fileSystem.find(gasPublicPath, new RegExp('\\.xml$', 'i'))

    if (null === xmlFile) {
      return
    }

    const xml = await fileSystem.loadXmlFile(xmlFile)
    const json = JSON.stringify(xml.pdv_liste.pdv)

    fs.writeFile(`${gasPublicPath}/${gasJson}`, json, 'utf-8')

    fileSystem.delete(gasPublicPath, gasZip)
    fileSystem.delete('', fileSystem.find(gasPublicPath, new RegExp('\\.xml$', 'i')))
  }
}
