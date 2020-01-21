import { chain, Rule } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@nrwl/workspace';

export default function(schema: any): Rule {
  return chain([
    updateJsonInTree('package.json', json => {
      json.scripts['----- DEV BUILDS ---------'] = '';
      json.scripts.commit = 'commit';
      json.scripts['----- DEV BUILDS END -----'] = '';
      return json;
    })
  ]);
}
