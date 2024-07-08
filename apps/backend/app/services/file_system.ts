import axios from 'axios'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as unzipper from 'unzipper'
import { parseStringPromise } from 'xml2js'

export default class FileSystem {
  delete(directory: string, fileName: string | null): void {
    if (this.exist(directory, fileName) && fileName) {
      fs.unlinkSync(path.join(directory, fileName))
    }
  }

  exist(directory: string, fileName: string | null): boolean {
    const filePath = path.join(directory, fileName || '')
    return fs.existsSync(filePath)
  }

  find(directory: string, name: RegExp): string | null {
    if (!this.exist(directory, null)) {
      return null
    }

    const files = fs.readdirSync(directory)

    for (const file of files) {
      if (name.test(file)) {
        return path.join(directory, file)
      }
    }

    return null
  }

  async download(url: string | null, fileName: string, directory: string): Promise<void> {
    if (url === null) {
      return
    }

    this.createDirectoryIfDontExist(directory)
    const filePath = path.join(directory, fileName)

    const writer = fs.createWriteStream(filePath)
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }

  createDirectoryIfDontExist(directory: string): void {
    if (!this.exist(directory, null)) {
      fs.mkdirSync(directory, { recursive: true })
    }
  }

  async loadXmlFile(filePath: string) {
    const fullPath = path.resolve(filePath)
    const xmlData = await fs.promises.readFile(fullPath, 'latin1')
    const elements = await parseStringPromise(xmlData)
    return elements
  }

  async unzip(zipFilePath: string, extractTo: string): Promise<string | boolean> {
    const directory = await unzipper.Open.file(zipFilePath)
    await directory.extract({ path: extractTo, concurrency: 5 })

    const firstFile = directory.files[0]
    return firstFile ? firstFile.path : false
  }

  getFile(directory: string, fileName: string): string | false {
    if (this.exist(directory, fileName)) {
      return fs.readFileSync(path.join(directory, fileName), 'latin1')
    }

    return false
  }
}
