import shipData from '../assets/shipDataFields.json'

let shipClasses = {}
for (let shipClass of [].concat.apply([], Object.values(shipData.shipClasses))) {
  shipClasses[shipClass.name] = shipClass
}

export default class SheetConverter {
  constructor (parsedFile) {
    this.fileShips = parsedFile.data
      .filter(ship => ship['Operator'] === 'Starfleet') // Only Starfleet (for now)
      .filter(ship => ship['EC?'] === '') // Only non-EC
      .filter(ship => ship['Lost'] === '') // Only non-lost
      .filter(ship => ship['Registry'] !== '') // Exclude ships without registry
      .filter(ship => ship['Class'] !== 'Runabout') // Exclude runabouts
      .filter(ship => ship['Class'].indexOf('huttle') === -1) // Exclude shuttlecraft
      .filter(ship => ship['Notes'].indexOf('AU') === -1) // Exclude shuttlecraft
  }

  convert () {
    let convertedShips = {}
    for (let ship of this.fileShips) {
      ship = this.convertShip(ship)
      convertedShips[ship.registry] = ship
    }
    return convertedShips
  }

  convertShip (ship) {
    let names = this.getName(ship)
    return {
      registry: this.getRegistry(ship),
      name: names.name,
      shipClass: ship['Class'],
      prefix: names.prefix,
      scale: shipClasses[ship['Class']].scale,
      classStats: this.getClassStats(ship['Class']),
      veterancy: this.getVeterancy(ship['Rating']),
      bonusStats: this.getBonuses(ship),
      mobile: true
    }
  }

  getRegistry (ship) {
    let reg = ship['Registry'].replace(' (!)', '').split('-')
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

  getClassStats (className) {
    return [
      shipClasses[className].c,
      shipClasses[className].s,
      shipClasses[className].h,
      shipClasses[className].l,
      shipClasses[className].p,
      shipClasses[className].d
    ]
  }

  getBonuses (ship) {
    let bonuses = [0, 0, 0, 0, 0, 0]
    let shipClass = shipClasses[ship['Class']]
    let vet = this.getVeterancy(ship['Rating'])
    bonuses[0] = Number(ship['C']) - vet - shipClass.c
    bonuses[1] = Number(ship['S']) - vet - shipClass.s
    bonuses[2] = Number(ship['H']) - vet - shipClass.h
    bonuses[3] = Number(ship['L']) - vet - shipClass.l
    bonuses[4] = Number(ship['P']) - vet - shipClass.p
    bonuses[5] = Number(ship['D']) - shipClass.d
    return bonuses
  }
}
