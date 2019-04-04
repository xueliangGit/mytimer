import { Config } from '@stencil/core';
import { stylus } from '@stencil/stylus';
export const config: Config = {
  namespace: 'mycomponent',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],plugins: [
    stylus()
  ]
};
