import * as migration_20250313_151312 from './20250313_151312';

export const migrations = [
  {
    up: migration_20250313_151312.up,
    down: migration_20250313_151312.down,
    name: '20250313_151312'
  },
];
