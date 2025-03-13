import * as migration_20250313_021508 from './20250313_021508';
import * as migration_20250313_022211 from './20250313_022211';
import * as migration_20250313_023230 from './20250313_023230';
import * as migration_20250313_024147 from './20250313_024147';

export const migrations = [
  {
    up: migration_20250313_021508.up,
    down: migration_20250313_021508.down,
    name: '20250313_021508',
  },
  {
    up: migration_20250313_022211.up,
    down: migration_20250313_022211.down,
    name: '20250313_022211',
  },
  {
    up: migration_20250313_023230.up,
    down: migration_20250313_023230.down,
    name: '20250313_023230',
  },
  {
    up: migration_20250313_024147.up,
    down: migration_20250313_024147.down,
    name: '20250313_024147'
  },
];
