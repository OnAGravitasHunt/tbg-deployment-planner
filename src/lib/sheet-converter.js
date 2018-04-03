import shipData from '../assets/shipDataFields.json'

let shipClasses = {}
for (let shipClass of shipData.shipClasses) {
  shipClasses[shipClass.name] = {stats: shipClass.stats, scale: shipClass.scale}
}

export default class SheetConverter {
  constructor (parsedFile) {
    this.fileShips = parsedFile.data.filter(ship => ship['Operator'] === 'Starfleet')
  }

  convert () {
    return this.fileShips.map(ship => this.convertShip(ship))
  }

  convertShip (ship) {
    let names = this.getName(ship)
    return {
      registry: this.getRegistry(ship),
      name: names.name,
      shipClass: ship['Class'],
      prefix: names.prefix,
      scale: shipClasses[ship['Class']].scale,
      classStats: shipClasses[ship['Class']].stats,
      veterancy: this.getVeterancy(ship['Rating']),
      bonusStats: this.getBonuses(ship),
      mobile: true
    }
  }

  getRegistry (ship) {
    let reg = ship['Registry'].split('-')
    reg.shift()
    return reg.join('-')
  }

  getName (ship) {
    let name = ship['Ship name'].split(' ')
    let prefix = name.shift()
    name = name.join(' ')
    return {prefix: prefix, name: name}
  }

  getVeterancy (rating) {
    return {
      '': 0,
      'Blooded': 1,
      'Veteran': 2,
      'Elite': 3
    }[rating]
  }

  getBonuses (ship) {
    let bonuses = [0, 0, 0, 0, 0, 0]
    let classStats = shipClasses[ship['Class']].stats
    let vet = this.getVeterancy(ship['Rating'])
    bonuses[0] = Number(ship['C']) - vet - classStats[0]
    bonuses[1] = Number(ship['S']) - vet - classStats[1]
    bonuses[2] = Number(ship['H']) - vet - classStats[2]
    bonuses[3] = Number(ship['L']) - vet - classStats[3]
    bonuses[4] = Number(ship['P']) - vet - classStats[4]
    bonuses[5] = Number(ship['D']) - classStats[5]
    return bonuses
  }
}

// module.exports.SheetConverter = SheetConverter
