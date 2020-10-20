const path = require('path')

const pnpPaths = []
if (process.versions.pnp) {
  const pnp = require('pnpapi')

  const { PosixFS, ZipOpenFS } = require('@yarnpkg/fslib')
  const libzip = require('@yarnpkg/libzip').getLibzipSync()
  const fs = new PosixFS(new ZipOpenFS({ libzip }))
  const readJson = (path) => {
    try {
      const file = fs.readFileSync(path, { encoding: 'utf8' })
      return JSON.parse(file)
    } catch {
      return null
    }
  }

  // Find project dependencies that are OS.js packages.
  const projectInfo = pnp.getPackageInformation(pnp.findPackageLocator(__filename))
  for (const [name, reference] of projectInfo.packageDependencies) {
    const dependencyInfo = pnp.getPackageInformation(pnp.getLocator(name, reference))
    const packageJson = readJson(path.resolve(dependencyInfo.packageLocation, 'package.json'))
    if (packageJson && packageJson.osjs && packageJson.osjs.type === 'package') {
      const metadataJson = readJson(path.resolve(dependencyInfo.packageLocation, 'metadata.json'))
      if (metadataJson) {
        pnpPaths.push(dependencyInfo.packageLocation)
      }
    }
  }
}

module.exports = {
  discover: pnpPaths,
  tasks: [],
}
