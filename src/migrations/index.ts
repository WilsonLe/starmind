import * as migration_20250313_021508 from './20250313_021508';
import * as migration_20250313_022211 from './20250313_022211';
import * as migration_20250313_023230 from './20250313_023230';

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
    name: '20250313_023230'
  },
];
